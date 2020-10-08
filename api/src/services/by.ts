import { getRepository } from "typeorm";
import { By } from "../entity/By";

class ByService {
  private byRepository = getRepository(By);

  public getAllByer = async () => {
    const byer = await getRepository(By).find({ relations: ["studentbyer"] });
    return byer;
  };
}

export default ByService;
