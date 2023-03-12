import {CompareCryptoServiceParams, CryptoService} from "../abstractions";
import {injectable} from "inversify";
import bcrypt from 'bcryptjs';

@injectable()
export class CryptoServiceImpl implements CryptoService {
    public async compare(params: CompareCryptoServiceParams): Promise<boolean> {
        return bcrypt.compare(params.text, params.hash);
    }

    public async hash(text: string): Promise<string> {
        let generatedSalt: string = await bcrypt.genSalt(10);

        return bcrypt.hash(text, generatedSalt);
    }

}