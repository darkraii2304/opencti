import React, { Component } from 'react';
import PropTypes from 'prop-types';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import { compose } from 'ramda';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import inject18n from '../../../../components/i18n';
import { SubscriptionAvatars } from '../../../../components/Subscription';
import SystemEditionOverview from './SystemEditionOverview';

const styles = (theme) => ({
  header: {
    backgroundColor: theme.palette.navAlt.backgroundHeader,
    color: theme.palette.navAlt.backgroundHeaderText,
    padding: '20px 20px 20px 60px',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    left: 5,
    color: 'inherit',
  },
  importButton: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  container: {
    padding: '10px 20px 20px 20px',
  },
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.navAlt.background,
    color: theme.palette.header.text,
    borderBottom: '1px solid #5c5c5c',
  },
  title: {
    float: 'left',
  },
});

class SystemEditionContainer extends Component {
  render() {
    const {
      t, classes, handleClose, system,
    } = this.props;
    const { editContext } = system;
    return (
      <div>
        <div className={classes.header}>
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={handleClose.bind(this)}
            size="large">
            <Close fontSize="small" />
          </IconButton>
          <Typography variant="h6" classes={{ root: classes.title }}>
            {t('Update a system')}
          </Typography>
          <SubscriptionAvatars context={editContext} />
          <div className="clearfix" />
        </div>
        <div className={classes.container}>
          <SystemEditionOverview
            system={this.props.system}
            enableReferences={this.props.enableReferences}
            context={editContext}
            handleClose={handleClose.bind(this)}
          />
        </div>
      </div>
    );
  }
}

SystemEditionContainer.propTypes = {
  handleClose: PropTypes.func,
  classes: PropTypes.object,
  system: PropTypes.object,
  theme: PropTypes.object,
  t: PropTypes.func,
};

const SystemEditionFragment = createFragmentContainer(SystemEditionContainer, {
  system: graphql`
    fragment SystemEditionContainer_system on System {
      id
      ...SystemEditionOverview_system
      editContext {
        name
        focusOn
      }
    }
  `,
});

export default compose(
  inject18n,
  withStyles(styles, { withTheme: true }),
)(SystemEditionFragment);
