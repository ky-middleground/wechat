import type { DomainEntityType } from '@ky-infra/project-type';
export class DomainService {
  static #instance: DomainService;
  private constructor() {}
  static getInstance(): DomainService {
    if (!DomainService.#instance) {
      DomainService.#instance = new DomainService();
    }
    return DomainService.#instance;
  }

  async domainFunctionForOtherDomain(): Promise<DomainEntityType | any> {
    // todo

  }
}



