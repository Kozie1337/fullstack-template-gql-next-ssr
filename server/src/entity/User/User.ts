import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import isValidEmail from '../../helpers/is-valid-email';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType() // for gql
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int) // for gql
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Field()
  @Column('text')
  email: string;

  @Field()
  @Column('text', { nullable: true })
  username?: string;

  @Column('text')
  password: string;

  constructor(email: string, password: string, username?: string) {
    super();
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

export function validateUser(
  userInfo: User
): Promise<User | Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const { password, email } = userInfo;
    if (!password || !email) {
      reject({ emailOrPassword: 'Email and password required.' });
    }

    (async () => {
      // dont use async as promise executor, e.g. async (resolve, reject) => ...
      await validatePassword(password).catch((err) => reject(err));

      await validateEmail(email).catch((err) => reject(err));
    })();

    return resolve(userInfo);
  });
}

function validatePassword(
  password: string
): Promise<string | Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!password || password.length < 6) {
      console.log('password error');
      reject({ password: 'Password must be at least 6 characters long.' });
    }
    resolve(password);
  });
}

function validateEmail(
  email: string
): Promise<string | Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    if (!email || !isValidEmail(email)) {
      reject({ email: 'Invalid email' });
    }
    resolve(email);
  });
}
