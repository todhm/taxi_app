import { User } from '../services/auth.service';
import * as faker from 'faker'; // new
import { Trip } from '../services/trip.service';


export class UserFactory {
    static create(data?: Object): User {
        return User.create(Object.assign({
            id: faker.random.number(),
            username: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            group: 'rider',
            photo: faker.image.imageUrl()
        }, data));
    }
}


export class TripFactory {
    static create(data?: Object): Trip {
        return Trip.create(Object.assign({
            id: faker.random.number(),
            nk: faker.random.uuid(),
            created: faker.date.past(),
            updated: faker.date.past(),
            pick_up_address: faker.address.streetAddress(),
            drop_off_address: faker.address.streetAddress(),
            status: 'REQUESTED',
            driver: UserFactory.create({ group: 'driver' }),
            rider: UserFactory.create()
        }, data));
    }
}
