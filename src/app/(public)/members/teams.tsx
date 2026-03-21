const teams = [
  {
    title: "Executive Board",
    description: "The Executive Board oversees the organization's vision, strategy, and operations. They lead team coordination, manage partnerships, and ensure all initiatives align with RCC's mission and values!",
    members: [
      { name: "Julia Husainzada", role: "President" },
      { name: "Hodo Abdulkarim", role: "External Vice President" },
      { name: "Emily Leson", role: "Internal Vice President" },
      { name: "Melanie Regalado Hernandez", role: "Publicity Vice President" },
      { name: "Anusha Damle", role: "Treasurer" },
      { name: "Vera Faith Del Rio", role: "Secretary" }
    ]
  },
  {
    title: "Workshops",
    description: "The Workshops Committee organizes and facilitates engaging sessions that teach ethical, inclusive, and sustainable computing practices, while fostering collaboration among students from all majors!",
    members: [
      { name: "Jupjeet Rai", role: "Lead Ambassador" },
      { name: "Pranavi Kristipati", role: "Workshops Ambassador" },
      { name: "Hrishikesh Giri", role: "Workshops Ambassador" },
      { name: "Devarsh Shroff", role: "Workshops Ambassador" },
      { name: "Pearl Shah", role: "Workshops Ambassador" },
      { name: "Aysha Mujeeb", role: "Workshops Ambassador" },
      { name: "Madiha Fatima", role: "Workshops Ambassador" },
      { name: "Annie Doan", role: "Workshops Ambassador" }
    ]
  },
  {
    title: "Case",
    description: "The Case Competition Committee designs and hosts challenges that encourage participants to solve real-world tech ethics problems, promoting critical thinking, teamwork, and responsible innovation.",
    members: [
      { name: "Geeta Renavikar", role: "Lead Ambassador" },
      { name: "Ashley Roman", role: "Lead Ambassador" },
      { name: "Harsha Ramesh", role: "Case Ambassador" },
      { name: "Eesha Maddali", role: "Case Ambassador" },
      { name: "Pranavi Kristipati", role: "Case Ambassador" }
    ]
  },
  {
    title: "Consulting",
    description: "The Consulting Committee finds mission-aligned clients—such as nonprofits and socially responsible organizations—and works on real-world tech projects that apply ethical, inclusive computing principles.",
    members: [
      { name: "Samriddhi Matharu", role: "Lead Ambassador" },
      { name: "Surabhi Bage", role: "Consulting Ambassador" },
      { name: "Lexine Asuncion", role: "Consulting Ambassador" },
      { name: "Sherine Aldrin", role: "Consulting Ambassador" },
      { name: "Aishwarya Anburaja", role: "Consulting Ambassador" }
    ]
  },
  {
    title: "Industry",
    description: "The Industry Committee connects with professionals and companies to organize panels, speaker events, and networking opportunities that give members insight into how responsible computing is practiced across all industries.",
    members: [
      { name: "Madison Ammirati", role: "Lead Ambassador" },
      { name: "Sejal Ghanate", role: "Lead Ambassador" },
      { name: "Sumaiyah Alamgir", role: "Industry Ambassador" },
      { name: "Yamini Karthik", role: "Industry Ambassador" },
      { name: "Yuwen Zhang", role: "Industry Ambassador" },
      { name: "Harshitha Venkateswaran", role: "Industry Ambassador" },
      { name: "Diya Suresh", role: "Industry Ambassador" }
    ]
  },
  {
    title: "Web Development",
    description: "The Web Development committee designs and maintains ethical, accessible, and user-friendly websites that support the club's mission and initiatives.",
    members: [
      { name: "Shareen Rodrigues", role: "Lead Ambassador" },
      { name: "Eesha Maddali", role: "Lead Ambassador" },
      { name: "Tyler Awender", role: "Web Dev Ambassador" },
      { name: "Connie Ly", role: "Web Dev Ambassador" },
      { name: "Preethi Mohan", role: "Web Dev Ambassador" },
      { name: "Marl Jonson", role: "Web Dev Ambassador" },
      { name: "Matthew Bernard", role: "Web Dev Ambassador" },
      { name: "Emily Thach", role: "Web Dev Ambassador" },
      { name: "Caleb Fringer", role: "Web Dev Ambassador" },
      { name: "Alvin Tran", role: "Web Dev Ambassador" }
    ]
  },
  {
    title: "Membership Outreach",
    description: "The Membership Outreach committee promotes community engagement by recruiting new members, organizing social events, and fostering an inclusive community aligned with RCC's values.",
    members: [
      { name: "Zara Rahim", role: "Lead Ambassador" },
      { name: "Izabella Doser", role: "Lead Ambassador" },
      { name: "Shravya Vinjamuri", role: "Membership Outreach Ambassador" },
      { name: "Updesh Sachdeva", role: "Membership Outreach Ambassador" },
      { name: "Tabassum Zahir", role: "Membership Outreach Ambassador" },
      { name: "Mariam Jamil", role: "Membership Outreach Ambassador" },
      { name: "Don Dang", role: "Membership Outreach Ambassador" },
      { name: "Amishi Seth", role: "Membership Outreach Ambassador" }
    ]
  },
  {
    title: "Marketing",
    description: "The Marketing Committee promotes the Responsible Computing Club through two sub-teams: Digital Marketing, which manages online content and outreach, and Graphic Design, which creates visual materials to support the club's initiatives!",
    members: [
      { name: "Melanie Regalado Hernandez", role: "Lead Ambassador" },
      { name: "Bhoomika Gupta", role: "Lead Ambassador" },
      { name: "Jennifer Lucero", role: "Digital Marketing Ambassador" },
      { name: "Zara Raza", role: "Digital Marketing Ambassador" },
      { name: "Saahi Madras Sivakumar", role: "Digital Marketing Ambassador" },
      { name: "Marc McDaniel", role: "Digital Marketing Ambassador" },
      { name: "Alice Wu", role: "Digital Marketing Ambassador" },
      { name: "Chris Le", role: "Graphic Design Ambassador" },
      { name: "Madelyn Whitney", role: "Graphic Design Ambassador" },
      { name: 'Vy "Evie" Ho', role: "Graphic Design Ambassador" }
    ]
  },
  {
    title: "Journalism",
    description: "The Journalism Committee highlights RCC's initiatives by promoting awareness of responsible computing through event recaps and regularly published blogs on the Mozilla Foundation platform.",
    members: [
      { name: "Jan Abigail Acosta", role: "Journalism Ambassador" },
      { name: "Harika Chandrasekhar", role: "Journalism Ambassador" }
    ]
  },
  {
    title: "Growth Analytics",
    description: "The Growth Analytics Committee tracks and analyzes RCC's engagement data, designs surveys for feedback, and creates visual summaries to inform and improve club outreach and events.",
    members: [
      { name: "Asmita Dulla", role: "Lead Ambassador" },
      { name: "Sonya Sorkin", role: "Growth Analytics Ambassador" },
      { name: "Zainab Shaikh", role: "Growth Analytics Ambassador" },
      { name: "Vani Sethi", role: "Growth Analytics Ambassador" }
    ]
  },
  {
    title: "Finance",
    description: "The Finance Committee supports RCC by organizing fundraisers, applying for grants, and assisting the treasurer with reimbursements and expense tracking.",
    members: [
      { name: "Anusha Damle", role: "Lead Ambassador" },
      { name: "Dhwanil Ranpura", role: "Finance Ambassador" }
    ]
  }
];

export default teams;
