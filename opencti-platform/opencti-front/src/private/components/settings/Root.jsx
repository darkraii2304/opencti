import React, { Suspense, lazy } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { isOnlyOrganizationAdmin, VIRTUAL_ORGANIZATION_ADMIN, SETTINGS, SETTINGS_SETACCESSES, SETTINGS_SETLABELS, SETTINGS_SETMARKINGS } from '../../../utils/hooks/useGranted';
import { BoundaryRoute } from '../Error';
import Loader from '../../../components/Loader';

const Security = lazy(() => import('../../../utils/Security'));
const RootActivity = lazy(() => import('./activity/Root'));
const CaseTemplates = lazy(() => import('./case_templates/CaseTemplates'));
const CaseTemplateTasks = lazy(() => import('./case_templates/CaseTemplateTasks'));
const Groups = lazy(() => import('./Groups'));
const RootGroup = lazy(() => import('./groups/Root'));
const KillChainPhases = lazy(() => import('./KillChainPhases'));
const Labels = lazy(() => import('./Labels'));
const MarkingDefinitions = lazy(() => import('./MarkingDefinitions'));
const Notifiers = lazy(() => import('./Notifiers'));
const RootSettingsOrganization = lazy(() => import('./organizations/Root'));
const Policies = lazy(() => import('./Policies'));
const Retention = lazy(() => import('./Retention'));
const Roles = lazy(() => import('./Roles'));
const RootRole = lazy(() => import('./roles/Root'));
const Rules = lazy(() => import('./Rules'));
const Sessions = lazy(() => import('./Sessions'));
const Settings = lazy(() => import('./Settings'));
const SettingsOrganizations = lazy(() => import('./SettingsOrganizations'));
const FileIndexing = lazy(() => import('./file_indexing/FileIndexing'));
const StatusTemplates = lazy(() => import('./status_templates/StatusTemplates'));
const RootSubType = lazy(() => import('./sub_types/Root'));
const SubTypes = lazy(() => import('./sub_types/SubTypes'));
const Users = lazy(() => import('./Users'));
const RootUser = lazy(() => import('./users/Root'));
const Vocabularies = lazy(() => import('./Vocabularies'));
const VocabularyCategories = lazy(() => import('./VocabularyCategories'));

const Root = () => {
  const adminOrga = isOnlyOrganizationAdmin();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Security needs={[SETTINGS, VIRTUAL_ORGANIZATION_ADMIN]} placeholder={<Redirect to="/dashboard" />}>
          <BoundaryRoute exact path="/dashboard/settings" component={Settings} />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES, VIRTUAL_ORGANIZATION_ADMIN]}
                placeholder={
                  <BoundaryRoute
                    exact
                    path="/dashboard/settings/accesses"
                    render={() => (
                      <Security
                        needs={[SETTINGS_SETMARKINGS]}
                        placeholder={<Redirect to="/dashboard/settings" />}
                      >
                        <Redirect to="/dashboard/settings/accesses/marking" />
                      </Security>
                    )}
                  />
                }
              >
                <Redirect to={adminOrga ? '/dashboard/settings/accesses/organizations' : '/dashboard/settings/accesses/roles'} />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/users"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES, VIRTUAL_ORGANIZATION_ADMIN]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Users />
              </Security>
            )}
          />
          <BoundaryRoute
            path="/dashboard/settings/accesses/users/:userId"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES, VIRTUAL_ORGANIZATION_ADMIN]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <RootUser />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/organizations"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES, VIRTUAL_ORGANIZATION_ADMIN]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <SettingsOrganizations />
              </Security>
            )}
          />
          <BoundaryRoute
            path="/dashboard/settings/accesses/organizations/:organizationId"
            component={RootSettingsOrganization}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/roles"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES, VIRTUAL_ORGANIZATION_ADMIN]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Roles />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/policies"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES]}
                placeholder={<Redirect to={'/dashboard/policies'} />}
              >
                <Policies />
              </Security>
            )}
          />
          <BoundaryRoute
            path="/dashboard/settings/accesses/roles/:roleId"
            component={RootRole}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/groups"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Groups />
              </Security>
            )}
          />
          <BoundaryRoute
            path="/dashboard/settings/accesses/groups/:groupId"
            component={RootGroup}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/sessions"
            render={() => (
              <Security
                needs={[SETTINGS_SETACCESSES]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Sessions />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/accesses/marking"
            render={() => (
              <Security
                needs={[SETTINGS_SETMARKINGS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <MarkingDefinitions />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/activity"
            render={() => <Redirect to="/dashboard/settings/activity/audit" />}
          />
          <BoundaryRoute
            path="/dashboard/settings/activity"
            render={() => <RootActivity />}
          />
          <BoundaryRoute
            path="/dashboard/settings/file_indexing"
            render={() => <FileIndexing />}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/customization"
            render={() => (
              <Redirect to="/dashboard/settings/customization/entity_types" />
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/customization/entity_types"
            component={SubTypes}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/customization/retention"
            component={Retention}
          />
          <BoundaryRoute
            path="/dashboard/settings/customization/entity_types/:subTypeId"
            render={() => <RootSubType />}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/status_templates"
            component={StatusTemplates}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/customization/rules"
            component={Rules}
          />
          <BoundaryRoute
            path="/dashboard/settings/customization/notifiers"
            component={Notifiers}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Redirect to="/dashboard/settings/vocabularies/labels" />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/labels"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Labels />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/case_templates"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <CaseTemplates />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/case_templates/:caseTemplateId"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <CaseTemplateTasks />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/kill_chain_phases"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <KillChainPhases />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/fields"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <VocabularyCategories />
              </Security>
            )}
          />
          <BoundaryRoute
            exact
            path="/dashboard/settings/vocabularies/fields/:category"
            render={() => (
              <Security
                needs={[SETTINGS_SETLABELS]}
                placeholder={<Redirect to={'/dashboard/settings'} />}
              >
                <Vocabularies />
              </Security>
            )}
          />
        </Security>
      </Switch>
    </Suspense>
  );
};
export default Root;
