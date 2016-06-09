module.exports = {
  refer: [
    { identifier: 'national',
      data: [
        {
          section: 'emergency',
          phone: '999',
          link: 'http://dkjflk.com',
          advice: 'Go to their nearest Accident and Emergency (A and E)'
        },
        {
          section: 'nhs',
          phone: '111',
          link: 'http://www.nhsdirect.nhs.uk',
          advice: 'They can tell you about your local crisis support services, and also offer health advice 24 hours a day, 365 days a year'
        }
      ]
    },
    {
      identifier: 'school',
      data: [
        { name: 'Mrs Jain',
          position: 'SENCO',
          description: 'Offers consultations about children you are concerned about any morning 9-12',
          email: 'MJain@school.ac.uk',
          phone: '07123456789' }
      ]
    },
    {
      identifier: 'community',
      data: [
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
    {
      identifier: 'selfReferral',
      data: [
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
