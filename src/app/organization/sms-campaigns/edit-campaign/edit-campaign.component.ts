/** Angular Imports */
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dates } from 'app/core/utils/dates';

/** Custom Services */
import { OrganizationService } from 'app/organization/organization.service';
import { SettingsService } from 'app/settings/settings.service';

/** Custom Components */
import { CampaignMessageStepComponent } from '../sms-campaign-stepper/campaign-message-step/campaign-message-step.component';

/**
 * Edit Campaign Component
 */
@Component({
  selector: 'mifosx-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss']
})
export class EditCampaignComponent {
  /** smsCampaign */
  smsCampaign: any;
  /** SMS Campaign Template */
  smsCampaignTemplate: any;
  /** Run report headers */
  templateParameters: any;

  /** Campaign Message Step */
  @ViewChild(CampaignMessageStepComponent, { static: true }) campaignMessageStep: CampaignMessageStepComponent;

  /**
   * Fetches campaign template from `resolve`
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {Dates} dateUtils Date Utils
   * @param {OrganizationService} organizationService Organiztion Service
   * @param {SettingsService} settingsService Settings Service
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateUtils: Dates,
    private organizationService: OrganizationService,
    private settingsService: SettingsService
  ) {
    this.route.data.subscribe((data: { smsCampaign: any; smsCampaignTemplate: any }) => {
      this.smsCampaignTemplate = data.smsCampaignTemplate;
      this.smsCampaign = data.smsCampaign;
      this.smsCampaign.editFlag = true;
    });
  }

  /**
   * Retrieves edited campaign message.
   */
  get campaignMessage() {
    return this.campaignMessageStep.campaignMessage.message;
  }

  /**
   * Passes template parameters to campaign-message-step.
   * @param {any} $event Template parameters
   */
  setParameters($event: any) {
    this.templateParameters = $event;
  }

  /**
   * Updates SMS Campaign.
   */
  submit() {
    // TODO: Update once language and date settings are setup
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    const dateTimeFormat = 'dd MMMM yyyy HH:mm:ss';
    const smsCampaign: any = {
      campaignName: this.smsCampaign.campaignName,
      campaignType: this.smsCampaign.isNotification ? 2 : 1,
      isNotification: this.smsCampaign.isNotification,
      triggerType: this.smsCampaign.triggerType.id,
      providerId: this.smsCampaign.providerId === 0 ? null : this.smsCampaign.providerId,
      runReportId: this.smsCampaign.runReportId,
      message: this.campaignMessage,
      paramValue: JSON.parse(this.smsCampaign.paramValue),
      dateTimeFormat,
      dateFormat,
      locale
    };
    if (this.smsCampaign.triggerType.id === 2) {
      smsCampaign.recurrenceStartDate = this.dateUtils.formatDate(
        new Date(this.smsCampaign.recurrenceStartDate),
        dateTimeFormat
      );
    }
    this.organizationService.updateSmsCampaign(smsCampaign, this.smsCampaign.id).subscribe((response: any) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
