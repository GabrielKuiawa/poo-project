import Image from "../models/Image";
import { RepositoryService } from "../service/RepositoryService";

export default class ImageRepository extends RepositoryService<Image>{
    constructor() {
        super(Image);
    }
}