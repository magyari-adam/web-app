/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Custom Components */
import { SavingsAccountViewComponent } from './savings-account-view/savings-account-view.component';
import { TransactionsTabComponent } from './savings-account-view/transactions-tab/transactions-tab.component';
import { DatatableTransactionTabComponent } from './savings-account-view/transactions/view-transaction/datatable-transaction-tab/datatable-transaction-tab.component';
import { SavingAccountActionsComponent } from './saving-account-actions/saving-account-actions.component';
import { ChargesTabComponent } from './savings-account-view/charges-tab/charges-tab.component';
import { StandingInstructionsTabComponent } from './savings-account-view/standing-instructions-tab/standing-instructions-tab.component';
import { DatatableTabsComponent } from './savings-account-view/datatable-tabs/datatable-tabs.component';
import { CreateSavingsAccountComponent } from './create-savings-account/create-savings-account.component';
import { EditSavingsAccountComponent } from './edit-savings-account/edit-savings-account.component';
import { ViewTransactionComponent } from './savings-account-view/transactions/view-transaction/view-transaction.component';
import { ViewChargeComponent } from './savings-account-view/view-charge/view-charge.component';
import { ViewRecieptComponent } from './savings-account-view/transactions/view-reciept/view-reciept.component';
import { ExportTransactionsComponent } from './savings-account-view/transactions-tab/export-transactions/export-transactions.component';
import { EditTransactionComponent } from './savings-account-view/transactions/edit-transaction/edit-transaction.component';
import { CreateGsimAccountComponent } from './gsim-account/create-gsim-account/create-gsim-account.component';
import { GsimAccountComponent } from './gsim-account/gsim-account.component';

/** Custom Resolvers */
import { SavingsAccountViewResolver } from './common-resolvers/savings-account-view.resolver';
import { SavingsDatatableResolver } from './common-resolvers/savings-datatable.resolver';
import { SavingsDatatablesResolver } from './common-resolvers/savings-datatables.resolver';
import { TransactionDatatableResolver } from './common-resolvers/transaction-datatable.resolver';
import { TransactionDatatablesResolver } from './common-resolvers/transaction-datatables.resolver';
import { SavingsAccountTemplateResolver } from './common-resolvers/savings-account-template.resolver';
import { SavingsAccountAndTemplateResolver } from './common-resolvers/savings-account-and-template.resolver';
import { SavingsAccountTransactionResolver } from './common-resolvers/savings-account-transaction.resolver';
import { SavingsAccountChargeResolver } from './common-resolvers/savings-account-charge.resolver';
import { SavingsAccountActionsResolver } from './common-resolvers/savings-account-actions.resolver';
import { SavingsTransactionRecieptResolver } from './common-resolvers/savings-transaction-reciept.resolver';
import { SavingsAccountTransactionTemplateResolver } from './common-resolvers/savings-account-transaction-template.resolver';
import { GSIMAccountsResolver } from 'app/groups/common-resolvers/gsim-account-resolver';
import { GroupAccountsResolver } from 'app/groups/common-resolvers/group-account.resolver';
import { GSIMViewResolver } from './gsim-account/gsim-account.resolver';
import { GroupViewResolver } from 'app/groups/common-resolvers/group-view.resolver';
import { SavingsDocumentsTabComponent } from './savings-account-view/savings-documents-tab/savings-documents-tab.component';
import { NotesTabComponent } from './savings-account-view/notes-tab/notes-tab.component';
import { SavingNotesResolver } from './common-resolvers/saving-notes.resolver';
import { SavingDocumentsResolver } from './common-resolvers/saving-documents.resolver';
import { SavingsTransactionGeneralTabComponent } from './savings-account-view/transactions/view-transaction/savings-transaction-general-tab/savings-transaction-general-tab.component';
import { GeneralTabComponent } from './savings-account-view/general-tab/general-tab.component';

/** Savings Routes */
const routes: Routes = [
  {
    path: '',
    data: { title: 'All Savings', breadcrumb: 'Savings', routeParamBreadcrumb: false },
    children: [
      {
        path: 'create',
        data: { title: 'Create Savings Account', breadcrumb: 'Create Savings Account' },
        component: CreateSavingsAccountComponent,
        resolve: {
          savingsAccountTemplate: SavingsAccountTemplateResolver
        }
      },
      {
        path: ':savingAccountId',
        data: { title: 'Saving Account View', routeParamBreadcrumb: 'savingAccountId' },
        component: SavingsAccountViewComponent,
        resolve: {
          savingsAccountData: SavingsAccountViewResolver,
          savingsDatatables: SavingsDatatablesResolver
        },
        children: [
          {
            path: '',
            redirectTo: 'general',
            pathMatch: 'full'
          },
          {
            path: 'general',
            data: { title: 'Savings Account Details', breadcrumb: 'General', routeParamBreadcrumb: false },
            children: [
              {
                path: '',
                component: GeneralTabComponent
              }
            ]
          },
          {
            path: 'transactions',
            data: { title: 'Savings Account Transactions', breadcrumb: 'Transactions', routeParamBreadcrumb: false },
            children: [
              {
                path: '',
                component: TransactionsTabComponent
              },
              {
                path: 'export',
                component: ExportTransactionsComponent
              }
            ]
          },
          {
            path: 'charges',
            component: ChargesTabComponent,
            data: { title: 'Savings Account Charges', breadcrumb: 'Charges', routeParamBreadcrumb: false }
          },
          {
            path: 'standing-instructions',
            component: StandingInstructionsTabComponent,
            data: { title: 'Savings Account SIH', breadcrumb: 'Standing Instructions', routeParamBreadcrumb: false }
          },
          {
            path: 'notes',
            component: NotesTabComponent,
            data: { title: 'Savings Account Notes', breadcrumb: 'Notes', routeParamBreadcrumb: false },
            resolve: {
              savingAccountNotes: SavingNotesResolver
            }
          },
          {
            path: 'documents',
            component: SavingsDocumentsTabComponent,
            data: { title: 'Savings Account Documents', breadcrumb: 'Documents', routeParamBreadcrumb: false },
            resolve: {
              savingsDocuments: SavingDocumentsResolver
            }
          },
          {
            path: 'datatables',
            children: [
              {
                path: ':datatableName',
                component: DatatableTabsComponent,
                data: { title: 'View Data Table', routeParamBreadcrumb: 'datatableName' },
                resolve: {
                  savingsDatatable: SavingsDatatableResolver
                }
              }
            ]
          }
        ]
      },
      {
        path: ':savingAccountId/edit',
        data: { title: 'Edit Savings Account', breadcrumb: 'Edit', routeParamBreadcrumb: false },
        component: EditSavingsAccountComponent,
        resolve: {
          savingsAccountAndTemplate: SavingsAccountAndTemplateResolver
        }
      },
      {
        path: ':savingAccountId/transactions/:id',
        data: { title: 'Savings Account Transactions', breadcrumb: 'Transactions', routeParamBreadcrumb: false },
        children: [
          {
            path: '',
            component: ViewTransactionComponent,
            resolve: {
              transactionDatatables: TransactionDatatablesResolver
            },
            children: [
              {
                path: '',
                redirectTo: 'general',
                pathMatch: 'full'
              },
              {
                path: 'general',
                component: SavingsTransactionGeneralTabComponent,
                resolve: {
                  savingsAccountTransaction: SavingsAccountTransactionResolver
                }
              },
              {
                path: 'datatables',
                children: [
                  {
                    path: ':datatableName',
                    component: DatatableTransactionTabComponent,
                    data: { title: 'View Data table', routeParamBreadcrumb: 'datatableName' },
                    resolve: {
                      transactionDatatable: TransactionDatatableResolver
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'edit',
            component: EditTransactionComponent,
            data: { breadcrumb: 'Edit', routeParamBreadcrumb: false },
            resolve: {
              savingsAccountTransactionTemplate: SavingsAccountTransactionTemplateResolver
            }
          },
          {
            path: 'reciept',
            component: ViewRecieptComponent,
            data: { breadcrumb: 'Reciept', routeParamBreadcrumb: false },
            resolve: {
              savingsTransactionReciept: SavingsTransactionRecieptResolver
            }
          }
        ]
      },
      {
        path: ':savingAccountId/charges',
        data: { title: 'Savings Account Charges', breadcrumb: 'Charges', routeParamBreadcrumb: false },
        children: [
          {
            path: '',
            redirectTo: '../charges',
            pathMatch: 'prefix'
          },
          {
            path: ':id',
            data: { routeParamBreadcrumb: 'id' },
            component: ViewChargeComponent,
            resolve: {
              savingsAccountData: SavingsAccountViewResolver,
              savingsAccountCharge: SavingsAccountChargeResolver
            }
          }
        ]
      },
      {
        path: ':savingAccountId/actions/:name',
        data: { title: 'Savings Account Actions', breadcrumb: 'Savings Account Actions', routeParamBreadcrumb: 'name' },
        component: SavingAccountActionsComponent,
        resolve: {
          savingsAccountActionData: SavingsAccountActionsResolver
        }
      },
      {
        path: ':savingAccountId/transfer-funds',
        loadChildren: () =>
          import('../account-transfers/account-transfers.module').then((m) => m.AccountTransfersModule)
      },
      {
        path: 'gsim-account',
        children: [
          {
            path: 'create',
            data: { title: 'Create GSIM Application', breadcrumb: 'Create GSIM Application' },
            component: CreateGsimAccountComponent,
            resolve: {
              groupsData: GroupViewResolver,
              savingsAccountTemplate: SavingsAccountTemplateResolver
            }
          },
          {
            path: ':savingAccountId',
            data: { title: 'GSIM Account View', routeParamBreadcrumb: 'savingAccountId' },
            children: [
              {
                path: '',
                component: GsimAccountComponent,
                resolve: {
                  gsimData: GSIMViewResolver,
                  savingAccountData: SavingsAccountViewResolver,
                  groupsData: GroupAccountsResolver
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [
    SavingsAccountViewResolver,
    SavingsDatatablesResolver,
    SavingsDatatableResolver,
    TransactionDatatableResolver,
    TransactionDatatablesResolver,
    SavingsAccountTemplateResolver,
    SavingsAccountAndTemplateResolver,
    SavingsAccountTransactionResolver,
    SavingsAccountChargeResolver,
    SavingsAccountActionsResolver,
    SavingsTransactionRecieptResolver,
    SavingsAccountTransactionTemplateResolver,
    GSIMAccountsResolver,
    GroupAccountsResolver,
    GSIMViewResolver
  ]
})
export class SavingsRoutingModule {}
