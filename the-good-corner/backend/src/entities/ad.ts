import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { Length } from "class-validator";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(10, 100)
  title: string;

  @Column()
  description: string;

  @Column()
  owner: string;

  @Column()
  price: number;

  @Column()
  ville: string;

  @Column({
    default:
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
