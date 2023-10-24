import type { DomainEntityType } from '@ky-infra/project-type';

export type DomainMethod1 = {
  '/domainName/path1': {
    params: any;
    method: 'get';
    apiLevel: 'User';
    data: any;
  };
};

export type DomainMethod2 = {
  '/domainName/path2': {
    params: any;
    method: 'post';
    apiLevel: 'Admin'; // 'None'
    data: DomainEntityType;
  };
};
