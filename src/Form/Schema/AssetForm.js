import * as Yup from 'yup';

export const ASSETS_SCHEMA = Yup.object().shape({
  assetName: Yup.string().required('Asset Name is required'),
  assetId: Yup.string().required('Asset ID is required'),
});

export const ASSETS_SCHEMA_INITIAL = {
  assetName: '',
  assetId: '',
  comment: '',
};

export const ALLOCATE_ASSET_SCHEMA = Yup.object().shape({
  employee: Yup.object().required('Please select an employee'),
  asset: Yup.object().required('Please select an Asset'),
});

export const ALLOCATE_ASSET_SCHEMA_INITIAL = {
  employee: '',
  asset: '',
};

export const REQUEST_ASSET_SCHEMA = Yup.object().shape({
  asset: Yup.string().required('Please write the name / title of asset'),
  specification: Yup.string().trim().required('Please write the specifications'),
});

export const REQUEST_ASSET_SCHEMA_INITIAL = {
  asset: '',
  specification: '',
};
