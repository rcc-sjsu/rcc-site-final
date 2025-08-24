export type teamMember = {
  name: string,
  linkedInURL: string
}

export type projectProps = {
  color: "blue" | "red",
  photoURL: string,
  projectName: string,
  projectURL?: string,
  teamName: string,
  description: string,
  teamMembers: {[key: string]: teamMember[]}
}
