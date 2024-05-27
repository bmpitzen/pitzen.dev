<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
const jamfBadges = [
  "Design Systems",
  "UI/UX",
  "Front-End Development",
  "JavaScript",
  "Angular",
  "Vue",
  "React",
  "Custom Web Components",
];
const mckessonBadges = [
  "Scrum Master",
  "Design Systems",
  "React",
  "Chakra",
  "Storybook",
  "Data Migrations",
  "Ruby",
  "JIRA",
  "Ruby on Rails",
];
const ArcESBBadges = [
  "AS2",
  "EDI",
  "Customer Solutions",
  "Documentation",
  "Video Marketing",
  "Technical Support",
  "Customer Service",
];
</script>

<template>
  <div>
    <div class="container grid grid-cols-1 mt-10 mb-10 lg:grid-cols-3">
      <div
        class="lg:col-start-3 flex items-center gap-2 lg:justify-end justify-center lg:row-start-1 mb-10"
      >
        <Avatar size="xl" shape="square">
          <AvatarImage
            src="https://bmpitzen-portfolio.s3.us-east-2.amazonaws.com/Brandon_Hat_Sage_v2.png"
            alt="Brandon Pitzen"
          />
          <AvatarFallback>BP</AvatarFallback>
        </Avatar>
      </div>
      <div class="col-span-3 lg:col-span-2 lg:row-start-1">
        <h1>Hi! I'm Brandon</h1>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          I am a software engineer passionate about creating and building
          things, with a focus on front-end technologies. Currently, I work as a
          UX Engineer at Jamf, where I design and implement user interfaces to
          enhance the user experience of our software products. I collaborate
          with cross-functional teams to gather requirements, conduct user
          research, create wireframes and prototypes, and ensure seamless
          integration of design and functionality. I also conduct usability
          testing and iterate on designs based on user feedback.
        </p>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          Previously, I worked at McKesson (later Ontada) as a full-stack
          software engineer, where I served as a Scrum Leader and specialized in
          front-end development. I contributed to building our design system and
          rebranding our flagship application, Clear Value Plus.
        </p>
        <p class="scroll-m-20 text-lg lg:text-xl my-4">
          Outside of work, I am an avid ultra-marathon runner, hiker, dad, and
          film photography enthusiast. I am always seeking new opportunities to
          learn, grow, and take on new challenges.
        </p>
      </div>
    </div>
    <div class="experience-page container grid grid-cols-3 mt-10 mb-20">
      <div class="col-span-3">
        <h1 class="my-4">Experience</h1>
        <div class="experience-cards">
          <job-info
            :jobTitle="`UX Engineer`"
            :company="`Jamf`"
            :startDate="`05/2022`"
            :endDate="`Present`"
          >
            <template v-slot:description>
              As a UX Engineer at Jamf, my role involves designing and
              implementing user interfaces that enhance the user experience of
              our software products. I collaborate with cross-functional teams
              to gather requirements, conduct user research, and create
              wireframes and prototypes. I also work closely with developers to
              ensure the seamless integration of design and functionality.
              Additionally, I conduct usability testing and iterate on designs
              based on user feedback. Overall, my goal is to create intuitive
              and visually appealing interfaces that optimize user satisfaction
              and engagement.
            </template>
            <template v-slot:responsibilities>
              <li>Built an active and thriving design system</li>
              <li>
                Supported several JavaScript frameworks such as Angular, Vue,
                and React
              </li>
              <li>
                Actively worked with developers throughout the product teams to
                enable streamlined development
              </li>
              <li>
                Conducting usability testing and iterating on designs based on
                user feedback
              </li>
              <li>
                Implemented a full redesign of our flagship Jamf Pro product to
                align with the new designs. This brought the app into a more
                modern design and improved the user experience. This also
                allowed the developers to fully embrace and adopt our design
                syatem leading to faster development and a more consistent user
                experience.
              </li>
              <li>
                Collaborated with the UX team to create a new design system that
                is used across all of our products. This design system is used
                by all of our developers and designers to ensure a consistent
                user experience across all of our products.
              </li>
              <li>
                Wrote and maintained documentation for our design system. This
                documentation is used by all of our developers and designers to
                ensure that they are using the design system correctly.
              </li>
            </template>
            <template v-slot:footer>
              <template v-for="item in jamfBadges">
                <Badge class="m-1">{{ item }}</Badge>
              </template>
            </template>
          </job-info>

          <job-info
            :jobTitle="`Sr. Associate Software Engineer, Scrum Master`"
            :company="`Mckesson (Ontada)`"
            :startDate="`05/2020`"
            :endDate="`05/2022`"
          >
            <template v-slot:description>
              For two years I worked at McKesson (later moved under the Ontada
              subsidiary) as a full-stack software engineer. During my time I
              gained resposibility as a Scrum Leader on our team and further
              niched down my work into front-end development while helping to
              build our design system.
            </template>
            <template v-slot:responsibilities>
              <li>
                Implemented a full rebrand of our application to new corporate
                design
              </li>
              <li>
                Collaborated across teams to implement a design system utilized
                corporation-wide using React, Chakra and Storybook
              </li>
              <li>
                Partnered with stakeholders and developers to implement a
                migration of our largest customer to the newest version of our
                flagship product
              </li>
              <li>
                Designed and implemented completely new features to meet the
                needs of our largest customers
              </li>
              <li>
                Complete thorough code reviews in GitHub to maintain high
                quality code
              </li>
              <li>
                Facilitate daily standup, sprint planning, estimations, and
                sprint reviews for team of 15
              </li>
              <li>
                Identify and resolve impediments to keep work moving forward
              </li>
              <li>
                Ensure the active sprint in JIRA accurately reflects the real
                world progress
              </li>
              <li>
                Together with the Product Owner, work to prioritize backlog
                items so they align with present needs
              </li>
            </template>
            <template v-slot:footer>
              <template v-for="item in mckessonBadges">
                <Badge class="m-1">{{ item }}</Badge>
              </template>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Technical Support Engineer`"
            :company="`ArcESB`"
            :startDate="`05/2019`"
            :endDate="`11/2019`"
          >
            <template v-slot:description>
              My tenure as a Technical Support Engineer at ArcESB involved
              direct interaction with clients to implement AS2 and EDI
              solutions, developing custom solutions for unique client needs,
              contributing to the company's knowledge base and documentation,
              and creating promotional video content for the company's
              rebranding efforts.
            </template>
            <template v-slot:responsibilities>
              <li>
                Directly implemented AS2 and EDI solutions for Systems
                Administrators
              </li>
              <li>
                Developed custom solutions for challenging customer use-cases
              </li>
              <li>Contributed to online documentation and knowledge base</li>
              <li>
                Filmed and edited new promotional video content for company
                rebrand
              </li>
            </template>
            <template v-slot:footer>
              <template v-for="item in ArcESBBadges">
                <Badge class="m-1">{{ item }}</Badge>
              </template>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Software Developer`"
            :company="`Sandro Tech Solutions`"
            :startDate="`11/2018`"
            :endDate="`01/2019`"
          >
            <template v-slot:description>
              As a Software Developer at Sandro Tech Solutions, I was primarily
              involved in significant development projects including a complete
              rebuild of the user authentication system.
            </template>
            <template v-slot:responsibilities>
              <li>
                Responsible for a complete rebuild of the user authentication
                system
              </li>
              <li>
                Worked closely with a high profile client to build an
                application that suits their customers unique needs
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Back-End Engineering Student`"
            :company="`Momentum Learning`"
            :startDate="`07/2018`"
            :endDate="`10/2018`"
          >
            <template v-slot:description>
              A 12-week immersive training program at Momentum Learning,
              focusing on object-oriented programming and project-based
              learning, including code reviews, technical presentations, and
              pair programming.
            </template>
            <template v-slot:responsibilities>
              <li>Specialized in Back-End Development; Ruby on Rails</li>
              <li>
                Engaged in code review, technical presentations, and pair
                programming
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Back-End Developer for Momentum Capstone Project`"
            :company="`WaveWise`"
            :startDate="`10/2018`"
            :endDate="`10/2018`"
          >
            <template v-slot:description>
              Sole back-end developer for the WaveWise project during the
              Momentum Learning capstone, focusing on creating a robust data
              infrastructure and API.
            </template>
            <template v-slot:responsibilities>
              <li>
                Developed the database and API for WaveWise's operational needs
              </li>
              <li>
                Built a RESTful API in Ruby on Rails to interface with the
                front-end
              </li>
              <li>Integrated external APIs for buoy and weather data</li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Manager: A/V Team`"
            :company="`Vintage Durham`"
            :startDate="`06/2018`"
            :endDate="`Present`"
          >
            <template v-slot:description>
              Manage a team of audio and visual technicians, overseeing
              training, scheduling, and technical infrastructure implementation
              at Vintage Durham.
            </template>
            <template v-slot:responsibilities>
              <li>Managed growth of technician team from 3 to 10 members</li>
              <li>
                Designed and implemented audio and visual systems for new
                facilities
              </li>
              <li>
                Created a handbook of best practices and troubleshooting steps
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Pharmacy Technician`"
            :company="`Duke University Hospital`"
            :startDate="`03/2017`"
            :endDate="`07/2018`"
          >
            <template v-slot:description>
              As a Pharmacy Technician at Duke University Hospital, I was
              involved in compounding medications and improving pharmacy
              operations.
            </template>
            <template v-slot:responsibilities>
              <li>Compounded chemotherapy and supplemental care medications</li>
              <li>Managed training for new technicians</li>
              <li>
                Developed systems for tracking medication usage and expiration
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Owner & Founder`"
            :company="`Old Anchor Films`"
            :startDate="`07/2013`"
            :endDate="`04/2017`"
          >
            <template v-slot:description>
              Founder of Old Anchor Films, a boutique wedding and commercial
              film company in Wilmington, handling international and local
              clients.
            </template>
            <template v-slot:responsibilities>
              <li>Managed multiple film projects under strict deadlines</li>
              <li>
                Performed roles of photographer, cinematographer, and designer
              </li>
              <li>Designed and maintained the company website</li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Owner & Founder`"
            :company="`Hammocks For Hope`"
            :startDate="`11/2015`"
            :endDate="`01/2018`"
          >
            <template v-slot:description>
              Co-founder of Hammocks For Hope, an outdoor equipment manufacturer
              specializing in ultralight backpacking gear.
            </template>
            <template v-slot:responsibilities>
              <li>Achieved cost reduction of over 75% per hammock</li>
              <li>
                Handled product design, production, and customer satisfaction
              </li>
              <li>
                Managed graphic and website design, ensuring proper inventory
                levels
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Producer & Video Editor`"
            :company="`EventMix Promotions`"
            :startDate="`03/2015`"
            :endDate="`03/2017`"
          >
            <template v-slot:description>
              Managed live production and editing for various sporting event
              broadcasts at EventMix Promotions.
            </template>
            <template v-slot:responsibilities>
              <li>
                Live-produced broadcast streams for numerous sporting events
              </li>
              <li>
                Directed camera operators to ensure optimal broadcast quality
              </li>
            </template>
          </job-info>
          <job-info
            :jobTitle="`Video Producer`"
            :company="`Liberty University`"
            :startDate="`01/2014`"
            :endDate="`07/2014`"
          >
            <template v-slot:description>
              Video Producer at Liberty University, involved in filming,
              editing, and managing equipment for various international
              university events.
            </template>
            <template v-slot:responsibilities>
              <li>
                Filmed and photographed international trips, producing recap
                videos
              </li>
              <li>Designed promotional content for events</li>
              <li>Managed equipment inventory and rentals</li>
            </template>
          </job-info>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-page {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2rem;
  margin-right: auto;
}
.experience-cards {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 1rem;
  margin: auto;
}

Badge {
  background-color: var(--menu-background);
  color: var(--natural);
}
</style>
