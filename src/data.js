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
      paragraph: 'Mind aid is a resource for teachers to...'
    },
    {
      subtitle: 'What2',
      paragraph: 'Mind aid is a resource for teachers to...2'
    }
  ],
  listen: [
    {
      listen: {
        letterL: 'listen non-judgmentally and empathically gather',
        letterI: 'gather Information, ask open questions, don\'t push',
        letterS: 'assess people\'s risk of harm, Self-harm or Suicide',
        letterT: 'tell them useful information about their problem, reassure',
        letterE: 'encouraging self-help and other support strategies',
        letterN: 'not alone, follow up and direct to appropriate professional help'
      },
      conversation_starters: [
        'Can you tell me a bit more about what happened?',
        'How were you feeling at the time?',
        'How are you feeling about it now?'
      ]
    }
  ],
  learn: [
    {
      category: 'The Aggressive/Difficult Child',
      'things_to_know': []
    },
    {
      category: 'The Sad And Isolated Child',
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
    {
      national: [
        {
          section: 'emergency',
          info: {
            phone: '999',
            link: 'http://dkjflk.com',
            advice: 'Go to their nearest Accident and Emergency (A&E)'
          }
        },
        {
          section: 'nhs',
          info: {
            phone: '111',
            link: 'http://www.nhsdirect.nhs.uk',
            advice: 'They can tell you about your local crisis support services, and also offer health advice 24 hours a day, 365 days a year'
          }
        }
      ],
      in_school: [
        {
          info: [
            {
              name: 'Mrs Jain',
              position: 'SENCO',
              description: 'Offers consultations about children you are concerned about any morning 9-12',
              email: 'MJain@school.ac.uk',
              phone: '07123456789'
            }
          ]
        }
      ],
      in_community: [
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
      ],
      'self_referral': [
        {
          'service_name': 'Surrey East Young People Walk in Service',
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
      // 'local': [
      //   {
      //     'section': 'in_community',
      //     'info': [
      //       {
      //         'name': 'Zoe',
      //         'position': 'Primary Mental Health Worker (PMHW)',
      //         'description': ' in school fortnightly on Thursdays',
      //         'email': 'zoe@school.ac.uk',
      //         'phone': '',
      //         'links': [
      //           {
      //             'name': 'youth minds',
      //             'link': 'http://www.youngminds.org.uk/contact'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     'section': 'self_referral',
      //     'info': [
      //       {
      //         'service_name': 'Surrey East Young People Walk in Service',
      //         'description': 'Drop in charity provision for mental health',
      //         'email': 'surrey@surrey.com',
      //         'links': [
      //           {
      //             'name': 'Parents and Youth Info',
      //             'link': 'http://camhs.org'
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    }
  ]
}
