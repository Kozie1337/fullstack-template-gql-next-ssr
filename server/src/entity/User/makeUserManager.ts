import { User } from './User';
export default function makeUserManager(): Readonly<{
  insert: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
}> {
  return Object.freeze({
    insert,
    findByEmail,
    // findByEmail,
    // findById,
    // remove,
    // update,
  });

  async function insert(user: User): Promise<void> {
    try {
      User.insert({ ...user });
    } catch (err) {
      console.log(err);
    }
  }
  async function findByEmail(email: string): Promise<User | null> {
    let response;
    try {
      const res = await User.findOne({ where: { email } });
      response = res;
    } catch (err) {
      console.log(err);
    }
    return response || null;
  }
}
