
@json
export class User {

  @alias("User.id")
  id!: string;


  @alias("User.email")
  email: string = "";


  @alias("User.clerkId")
  clerkId: string = "";


  @alias("User.projects")
  projects: Project[] = [];
}


@json
export class Project {

  @alias("Project.id")
  id!: string;


  @alias("Project.name")
  name: string = "";


  @alias("Project.description")
  description: string = "";


  @alias("Project.isDeployed")
  isDeployed: boolean = false;


  @alias("Project.endpoint")
  endpoint: string = "";


  @alias("Project.owner")
  owner: string = "";


  @alias("Project.token")
  token: string = "";
}


@json
export class Image {

  @alias("Image.id")
  id!: string;


  @alias("Image.imageUrl")
  imageUrl: string = "";


  @alias("Image.label")
  label: string = "";


  @alias("Image.projectId")
  projectId: string = "";


  @alias("Image.token")
  token: string = "";


  @alias("Image.embedding")
  embedding: number[] = [];


  @alias("Image.owner")
  owner: string = "";
}
