// global
exports.globalData = {
  socialNetworks: ['facebook', 'youtube', 'twitter', 'pinterest', 'instagram'],
  mail: 'contact@designo.co',
  phone: '+1 253-863-8967',
}

exports.data = {
  home: {
    attributes: [
      {
        title: 'passionate',
        imagePath: 'home/desktop/illustration-passionate.svg',
        text: 'Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions.',
      },
      {
        title: 'resourceful',
        imagePath: 'home/desktop/illustration-resourceful.svg',
        text: 'Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs.',
      },
      {
        title: 'friendly',
        imagePath: 'home/desktop/illustration-friendly.svg',
        text: ' We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.',
      },
    ],
    teasers: [
      {
        title: 'Web Design',
        slug: 'web-design',
        imageDesktop: 'web-design-big',
      },
      {
        title: 'App Design',
        slug: 'app-design',
      },
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
      },
    ],
  },
  webdesign: {
    hero: {
      title: 'Web Design',
      text: 'We build websites that serve as powerful marketing tools and bring memorable brand experiences.',
    },

    imageFolder: 'web-design',

    cards: [
      {
        heading: 'express',
        description: 'A multi-carrier shipping website for ecommerce businesses',
      },
      {
        heading: 'transfer',
        description: 'Site for low-cost money transfers and sending money within seconds',
      },
      {
        heading: 'photon',
        description: 'A state-of-the-art music player with high-resolution audio and DSP effects',
      },

      {
        heading: 'builder',
        description: 'Connects users with local contractors based on their location',
      },
      {
        heading: 'blogr',
        description: 'Blogr is a platform for creating an online blog or publication',
      },
      {
        heading: 'camp',
        description: 'Get expert training in coding, data, design, and digital marketing',
      },
    ],
    teasers: [
      {
        title: 'App Design',
        slug: 'app-design',
      },
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
      },
    ],
  },

  appdesign: {
    hero: {
      title: 'App Design',
      text: 'Our mobile designs bring intuitive digital solutions to your customers right at their fingertips.',
    },

    imageFolder: 'app-design',

    cards: [
      {
        heading: 'airfilter',
        description: 'Solving the problem of poor indoor air quality by filtering the air',
      },
      {
        heading: 'eyecam',
        description: 'Product that lets you edit your favorite photos and videos at any time',
      },
      {
        heading: 'faceit',
        description: 'Get to meet your favorite internet superstar with the faceit app',
      },

      {
        heading: 'todo',
        description: 'A todo app that features cloud sync with light and dark mode',
      },
      {
        heading: 'loopstudios',
        description: 'A VR experience app made for Loopstudios',
      },
    ],

    teasers: [
      {
        title: 'Web Design',
        slug: 'web-design',
        imageDesktop: 'web-design-small',
      },
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
      },
    ],
  },

  graphicdesign: {
    hero: {
      title: 'Graphic Design',
      text: 'We deliver eye-catching branding materials that are tailored to meet your business objectives.',
    },

    imageFolder: 'graphic-design',

    cards: [
      {
        heading: 'Tim Brown',
        description: 'A book cover designed for Tim Brown’s new release, ‘Change’',
        image: 'change',
      },
      {
        heading: 'boxed water',
        description: 'A simple packaging concept made for Boxed Water',
        image: 'boxed-water',
      },
      {
        heading: 'science',
        description: 'A poster made in collaboration with the Federal Art Project',
      },
    ],

    teasers: [
      {
        title: 'Web Design',
        slug: 'web-design',
        imageDesktop: 'web-design-small',
      },
      {
        title: 'App Design',
        slug: 'app-design',
      },
    ],
  },
  about: {
    hero: {
      title: 'About Us',
      text: 'Founded in 2010, we are a creative agency that produces lasting results for our clients. We’ve partnered with many startups, corporations, and nonprofits alike to craft designs that make real impact. We’re always looking forward to creating brands, products, and digital experiences that connect with our clients’ audiences.',
    },

    blockImageText: [
      {
        heading: 'About Us',
        paragraph: [
          'Founded in 2010, we are a creative agency that produces lasting results for our clients. We’ve partnered with many startups, corporations, and nonprofits alike to craft designs that make real impact. We’re always looking forward to creating brands, products, and digital experiences that connect with our clients’ audiences.',
        ],
        image: 'about-hero',
      },
      {
        heading: 'World-class talent',
        paragraph: [
          'We are a crew of strategists, problem-solvers, and technologists. Every design is thoughtfully crafted from concept to launch, ensuring success in its given market. We are constantly updating our skills in a myriad of platforms.',
          'Our team is multi-disciplinary and we are not merely interested in form — content and meaning are just as important. We give great importance to craftsmanship, service, and prompt delivery. Clients have always been impressed with our high-quality outcomes that encapsulates their brand’s story and mission.',
        ],
        image: 'world-class-talent',
        imageLeft: true,
      },

      {
        heading: 'The real deal',
        paragraph: [
          'As strategic partners in our clients’ businesses, we are ready to take on any challenge as our own. Solving real problems require empathy and collaboration, and we strive to bring a fresh perspective to every opportunity. We make design and technology more accessible and give you tools to measure success.',
          'We are visual storytellers in appealing and captivating ways. By combining business and marketing strategies, we inspire audiences to take action and drive real results.',
        ],
        image: 'real-deal',
        imageLeft: false,
      },
    ],
    attributes: [
      {
        title: 'Canada',
        imagePath: 'shared/desktop/illustration-canada.svg',
        link: '/locations#canada',
      },
      {
        title: 'Australia',
        imagePath: 'shared/desktop/illustration-australia.svg',
        link: '/locations#australia',
      },
      {
        title: 'United Kingdom',
        imagePath: 'shared/desktop/illustration-united-kingdom.svg',
        link: '/locations#united-kingdom',
      },
    ],
  },
  contact: {
    hero: {
      heading: 'Contact Us',
      text: 'Ready to take it to the next level? Let’s talk about your project or idea and find out how we can help your business grow. If you are looking for unique digital experiences that’s relatable to your users, drop us a line.',
    },
    attributes: [
      {
        title: 'Canada',
        imagePath: 'shared/desktop/illustration-canada.svg',
        link: '/locations#canada',
      },
      {
        title: 'Australia',
        imagePath: 'shared/desktop/illustration-australia.svg',
        link: '/locations#australia',
      },
      {
        title: 'United Kingdom',
        imagePath: 'shared/desktop/illustration-united-kingdom.svg',
        link: '/locations#united-kingdom',
      },
    ],
  },
  locations: {
    leaflet: true,
    places: [
      {
        lat: 43.70011,
        long: -79.4163,
        country: 'Canada',
        office: {
          name: 'Designo Central Office',
          address: {
            street: '3886 Wellington Street',
            city: 'Toronto',
            province: 'Ontario',
            postalCode: 'M9C 3J5',
          },
          contact: {
            phone: '+1 253-863-8967',
            mail: 'contact@designo.co',
          },
        },
      },
      {
        country: 'Australia',
        left: true,

        lat: -30.3245,
        long: 149.7858,
        office: {
          name: 'Designo AU Office',
          address: {
            street: '19 Balonne Street',
            city: 'Narrabri',
            postalCode: '2443',
          },
          contact: {
            phone: '(02) 6720 9092',
            mail: 'contact@designo.au',
          },
        },
      },
      {
        lat: 51.141529,
        long: 1.29764,
        country: 'United Kingdom',
        office: {
          name: 'Designo UK Office',
          address: {
            street: '13 Colorado Way',
            city: 'Rhyd-y-fro',
            postalCode: 'SA8 9GA',
          },
          contact: {
            phone: '078 3115 1400',
            mail: 'contact@designo.uk',
          },
        },
      },
    ],
  },
}
