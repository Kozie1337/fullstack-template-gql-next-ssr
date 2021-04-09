import { User } from "./User";
import { getManager } from "typeorm";
export default function makeUserManager() {
  return Object.freeze({
    insert,
    findByEmail,
    // findByEmail,
    // findById,
    // remove,
    // update,
  });

  async function insert(user: User) {
    User.insert({ ...user });
  }
  async function findByEmail(email: string) {
    let response;
    try {
      const res = await User.findOne({ where: { email } });
      response = res;
    } catch (e) {
      console.log(e);
    }
    return response || null;
  }
}
