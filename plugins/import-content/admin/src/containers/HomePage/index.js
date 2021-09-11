/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import UploadFileForm from '../../components/UploadFileForm';

const HomePage = () => {
  return (
    <div>
      <UploadFileForm />
    </div>
  );
};

export default memo(HomePage);
