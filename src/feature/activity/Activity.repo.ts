import { EntityRepository, Repository } from 'typeorm';
import { Activity } from '../../entity/Activity';

@EntityRepository(Activity)
export class ActivityRepo extends Repository<Activity>{

}
