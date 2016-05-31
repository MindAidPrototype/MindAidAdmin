// const users = [{
//   'users': [
//     {
//       'name': 'helen',
//       'position': 'helen',
//       'email': 'helen@helen.com',
//       'password': 'password',
//       'access_level': 3
//     },
//     {
//       'name': 'rob',
//       'position': 'SENCO',
//       'email': 'rob@rob.com',
//       'password': 'password',
//       'access_level': 2
//     },
//     {
//       'name': 'sam',
//       'position': 'Teacher',
//       'email': 'sam@sam.com',
//       'password': 'password',
//       'access_level': 1
//     }
//   ]
// }]

module.exports = {
  about: [
    {
      subtitle: 'What',
      paragraph: ['Mind aid is a resource for teachers to...', 'Paragraph 2']
    },
    {
      subtitle: 'What2',
      paragraph: ['Mind aid is a resource for teachers to...2', 'yo yo homie yo']
    },
    {
      subtitle: 'What3',
      paragraph: ['Mind aid is a resource for teachers to...']
    },
    {
      subtitle: 'What4',
      paragraph: ['Mind aid is a resource for teachers to...2', 'next paragraph']
    },
    {
      subtitle: 'Wha5',
      paragraph: ['Mind aid is a resource for teachers to...']
    },
    {
      subtitle: 'What6',
      paragraph: ['Mind aid is a resource for teachers to...2']
    }
  ],
  conversationStarters: [
    { question: 'Can you tell me a bit more about what happened?' },
    { question: 'How were you feeling at the time?' },
    { question: 'How are you feeling about it now?' }
  ],
  learn: [
    {
      category: 'The Aggressive/Difficult Child',
      subtitle: '10 things about anxiety to help you help your students',
      'things_to_know': ['a b c d e f', 'g h i']
    },
    {
      category: 'The Sad And Isolated Child',
      subtitle: 'Things about sad and isolated children',
      'things_to_know': [
        'Young people get sad, tearful, and lonely. This is entirely normal, and to be expected.',
        'fbjkebvrejkberjgkrelb gjerk'
      ]
    }
  ],
  questions: [
    {
      questions: [
        'Considerate of other people\'s feelings',
        'Restless, overactive, cannot stay still for long'
      ]
    }
  ],
  refer: [
    { national: [
      {
        section: 'emergency',
        phone: '999',
        link: 'http://dkjflk.com',
        advice: 'Go to their nearest Accident and Emergency (A&E)'
      },
      {
        section: 'nhs',
        phone: '111',
        link: 'http://www.nhsdirect.nhs.uk',
        advice: 'They can tell you about your local crisis support services, and also offer health advice 24 hours a day, 365 days a year'
      }
    ],
    },
    { inSchool: [
      {
        name: 'Mrs Jain',
        position: 'SENCO',
        description: 'Offers consultations about children you are concerned about any morning 9-12',
        email: 'MJain@school.ac.uk',
        phone: '07123456789'
      }
    ]
    },
    { inCommunity: [
      {
        name: 'Zoe',
        position: 'Primary Mental Health Worker (PMHW)',
        description: ' in school fortnightly on Thursdays',
        email: 'zoe@school.ac.uk',
        phone: '',
        links: [
          {
            name: 'youth minds',
            link: 'http://www.youngminds.org.uk/contact'
          }
        ]
      }
    ]
    },
    { selfReferral: [
      {
        serviceName: 'Surrey East Young People Walk in Service',
        description: 'Drop in charity provision for mental health',
        email: 'surrey@surrey.com',
        links: [
          {
            name: 'Parents and Youth Info',
            link: 'http://camhs.org'
          }
        ]
      }
    ]
    }
  ]
}
