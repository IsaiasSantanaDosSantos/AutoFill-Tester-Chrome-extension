import { faker } from '@faker-js/faker';

export const useId = faker.string.uuid()
export const email = faker.internet.email()
export const username = faker.internet.username()
export const password = faker.internet.password()
export const birthdate = faker.date.birthdate()
export const fullName = faker.person.fullName()