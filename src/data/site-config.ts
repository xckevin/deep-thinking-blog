export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    title: 'Deep thinking blog',
    subtitle: 'Deep thinking about app&web development, design, life, and more.',
    description: 'A hub for deep thinking and insightful exploration into the realms of app and web development, design, and the broader aspects of life. This platform goes beyond surface-level discussions to dive into the intricate details that define impactful technology and creativity. Whether it’s analyzing trends in app development, exploring innovative web design principles, or reflecting on the interplay between technology and daily life, the focus is always on meaningful and thought-provoking content. It’s a space where ideas are shared, curiosity is encouraged, and practical knowledge blends seamlessly with visionary thinking. From the technical nuances of coding and user experience design to the philosophical questions about how technology shapes our lives, this is a place to challenge assumptions, inspire action, and spark new perspectives. Join the journey of learning and discovery, and let’s rethink the boundaries of what’s possible together.',
    image: {
        src: '/dante-preview.jpg',
        alt: 'deep thinking blog preview image'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Courses',
            href: '/course'
        },
        {
            text: 'Speeches',
            href: '/speech'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        // {
        //     text: 'About',
        //     href: '/about'
        // },
        // {
        //     text: 'Contact',
        //     href: '/contact'
        // },
        // {
        //     text: 'Terms',
        //     href: '/terms'
        // },
        // {
        //     text: 'Download theme',
        //     href: 'https://github.com/JustGoodUI/dante-astro-theme'
        // }
    ],
    socialLinks: [
        // {
        //     text: 'Dribbble',
        //     href: 'https://dribbble.com/'
        // },
        // {
        //     text: 'Instagram',
        //     href: 'https://instagram.com/'
        // },
        // {
        //     text: 'X/Twitter',
        //     href: 'https://twitter.com/'
        // }
    ],
    hero: {
        title: 'Hi There & Welcome to Deep Thinking Blog',
        text: "Let's face it we all have to solve problems in life and work, whether we are running a business, designing the latest software application or trying to solve the worlds social and scientific problems if we are not coming up with creative new ideas we are not just standing still but going backwards. <br/>Deep Thinking Blog is here to help you with that, by sharing our thoughts and experiences on web development, programming, and design.",
        image: {
            src: '/hero.jpg',
            alt: 'Deep Thinking Blog hero image'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to Deep Thinking Blog',
        text: 'Update on time, with the latest news and articles. All the latest posts directly in your inbox.',
        formUrl: '#'
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
