import { Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { DomainEntityType } from '@ky-infra/project-type';
@modelOptions({
  schemaOptions: {
    collection: 'TableName',
    minimize: true,
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  },
  options: { allowMixed: Severity.ALLOW }
})
export class DomainEntity {
  @prop({ required: true, unique: true })
  id!: string;

  @prop()
  mobile?: string;

  @prop()
  email?: string;

  @prop({ required: true })
  shortId!: string;

  @prop()
  password?: string;

  @prop()
  json?: DomainEntityType

  @prop()
  promotionSource?: string;

  @prop({ required: true })
  createdTime!: Date;

  @prop({ required: true })
  updatedTime!: Date;
}

export const domainEntityModel = getModelForClass(DomainEntity);
