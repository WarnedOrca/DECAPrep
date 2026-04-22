import masterData from './master-pi-library.json';

// We map it to ensure the properties align perfectly if needed, but masterData is already mapped to the right schema.
// Just ensuring color / icon attributes are filled since masterData might not have them.
export const performanceIndicators = masterData.map(pi => {
  // Map cluster tags to colors
  let color = 'slate';
  if (pi.cluster_tag === 'Marketing') color = 'tertiary';
  else if (pi.cluster_tag === 'Finance') color = 'orange'; // or whatever looks good
  else if (pi.cluster_tag === 'Hospitality') color = 'blue';
  else if (pi.cluster_tag === 'BMA') color = 'violet';
  else if (pi.cluster_tag === 'Entrepreneurship') color = 'emerald';
  else if (pi.cluster_tag === 'Personal Finance') color = 'rose';

  return {
    id: pi.card_id,
    title: pi.main_title,
    cluster: pi.cluster_tag,
    topic: pi.topic_area,
    difficulty: pi.difficulty_label === 'PQ' ? 'Prerequisite' : (pi.difficulty_label === 'CS' ? 'Career Sustaining' : (pi.difficulty_label === 'SP' ? 'Specialist' : 'Core')),
    mastery: 'None', // Default mastery
    icon: 'workspace_premium',
    color: color
  };
});

// Exam catalog for the exam picker
export const examCatalog = [
  {
    id: 'marketing-cluster',
    name: 'Marketing Cluster Exam',
    category: 'Marketing',
    description: 'Test your knowledge of marketing fundamentals, branding, promotion mix, and channel management.',
    questionCount: 5,
    timeLimit: 600, // 10 min
    difficulty: 'Intermediate',
    icon: 'campaign',
    gradient: 'from-blue-600 to-blue-400',
    shadow: 'shadow-blue-500/20',
  },
  {
    id: 'finance-cluster',
    name: 'Finance Cluster Exam',
    category: 'Finance',
    description: 'Covers financial analysis, accounting dynamics, risk management, and economic principles.',
    questionCount: 5,
    timeLimit: 600,
    difficulty: 'Advanced',
    icon: 'account_balance',
    gradient: 'from-emerald-600 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    id: 'hospitality-cluster',
    name: 'Hospitality & Tourism Exam',
    category: 'Hospitality',
    description: 'Explore customer service, hotel operations, travel planning, and event management.',
    questionCount: 5,
    timeLimit: 600,
    difficulty: 'Intermediate',
    icon: 'hotel',
    gradient: 'from-amber-600 to-orange-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    id: 'business-admin',
    name: 'Business Administration Exam',
    category: 'Business Admin',
    description: 'Test your understanding of business law, HR management, ethics, and organizational strategy.',
    questionCount: 5,
    timeLimit: 600,
    difficulty: 'Core',
    icon: 'business_center',
    gradient: 'from-violet-600 to-purple-400',
    shadow: 'shadow-violet-500/20',
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Practice Exam',
    category: 'All Clusters',
    description: 'A full-length practice exam covering all DECA career clusters to simulate competition conditions.',
    questionCount: 10,
    timeLimit: 1200, // 20 min
    difficulty: 'Competition',
    icon: 'emoji_events',
    gradient: 'from-rose-600 to-pink-400',
    shadow: 'shadow-rose-500/20',
  },
];

// Questions organized by exam ID
export const examQuestionsBank = {
  'marketing-cluster': [
    {
      id: 1, indicator: 'Marketing Management', section: 'Wholesaling & Logistics',
      question: 'Which of the following best describes the role of a wholesaler in a marketing channel for industrial products?',
      options: {
        A: 'To provide direct technical support and installation services for complex manufacturing machinery to end-users.',
        B: 'To break bulk and consolidate shipments, reducing transportation costs and lead times for small-to-medium sized manufacturers.',
        C: 'To create and execute national advertising campaigns that focus on brand awareness for consumer packaged goods.',
        D: 'To act as a legal intermediary ensuring that all local government tariffs and international trade laws are strictly adhered to.'
      },
      correctAnswer: 'B'
    },
    {
      id: 2, indicator: 'Promotion', section: 'Advertising Strategy',
      question: 'Which promotional strategy uses a "push" approach to move products through the distribution channel?',
      options: {
        A: 'Running television commercials targeted at end consumers to create demand.',
        B: 'Offering trade discounts and incentives to wholesalers and retailers to stock products.',
        C: 'Creating a viral social media campaign to generate organic consumer interest.',
        D: 'Sponsoring a major sporting event to increase brand awareness.'
      },
      correctAnswer: 'B'
    },
    {
      id: 3, indicator: 'Product/Service Management', section: 'Branding',
      question: 'What is the primary advantage of brand extension as a branding strategy?',
      options: {
        A: 'It eliminates the need for any marketing research before launch.',
        B: 'It leverages existing brand equity to reduce the risk and cost of introducing new products.',
        C: 'It guarantees that the new product will outsell competitors in the same category.',
        D: 'It allows a company to enter a new market without any brand recognition.'
      },
      correctAnswer: 'B'
    },
    {
      id: 4, indicator: 'Pricing', section: 'Pricing Strategies',
      question: 'A company launches a new tech gadget at a very high initial price and gradually lowers it over time. This is an example of:',
      options: {
        A: 'Penetration pricing',
        B: 'Loss-leader pricing',
        C: 'Price skimming',
        D: 'Competitive pricing'
      },
      correctAnswer: 'C'
    },
    {
      id: 5, indicator: 'Market Research', section: 'Data Collection',
      question: 'Which of the following is a key advantage of using primary research data over secondary data?',
      options: {
        A: 'Primary data is always less expensive to collect.',
        B: 'Primary data is specifically tailored to the company\'s current research question.',
        C: 'Primary data is available more quickly than secondary data.',
        D: 'Primary data always has a larger sample size.'
      },
      correctAnswer: 'B'
    },
  ],
  'finance-cluster': [
    {
      id: 1, indicator: 'Financial Analysis', section: 'Accounting Dynamics',
      question: 'If a company\'s current ratio increases while its quick ratio decreases, what is the most likely cause?',
      options: {
        A: 'An increase in short-term accounts payable.',
        B: 'A sudden liquidation of inventory assets.',
        C: 'A significant accumulation of inventory.',
        D: 'Issuing long-term bonds to pay off short-term liabilities.'
      },
      correctAnswer: 'C'
    },
    {
      id: 2, indicator: 'Risk Management', section: 'Insurance',
      question: 'Which type of risk can be reduced through diversification of a portfolio?',
      options: {
        A: 'Systematic risk',
        B: 'Unsystematic risk',
        C: 'Market risk',
        D: 'Interest rate risk'
      },
      correctAnswer: 'B'
    },
    {
      id: 3, indicator: 'Economics', section: 'Monetary Policy',
      question: 'When the Federal Reserve increases the federal funds rate, what is the expected short-term effect?',
      options: {
        A: 'Increased consumer borrowing and spending.',
        B: 'Decreased cost of borrowing for businesses.',
        C: 'Reduced inflationary pressure in the economy.',
        D: 'Increased money supply in circulation.'
      },
      correctAnswer: 'C'
    },
    {
      id: 4, indicator: 'Accounting', section: 'Financial Statements',
      question: 'On which financial statement would you find "retained earnings"?',
      options: {
        A: 'Income Statement',
        B: 'Cash Flow Statement',
        C: 'Balance Sheet',
        D: 'Statement of Changes in Equity only'
      },
      correctAnswer: 'C'
    },
    {
      id: 5, indicator: 'Finance', section: 'Investment',
      question: 'What does a bond\'s "yield to maturity" represent?',
      options: {
        A: 'The annual coupon payment divided by the bond\'s face value.',
        B: 'The total return anticipated if the bond is held until it matures.',
        C: 'The current market price of the bond.',
        D: 'The interest rate set by the issuing company at the time of issuance.'
      },
      correctAnswer: 'B'
    },
  ],
  'hospitality-cluster': [
    {
      id: 1, indicator: 'Customer Relations', section: 'Service Quality',
      question: 'Which dimension of service quality refers to the ability to perform the promised service dependably and accurately?',
      options: {
        A: 'Tangibles',
        B: 'Reliability',
        C: 'Responsiveness',
        D: 'Empathy'
      },
      correctAnswer: 'B'
    },
    {
      id: 2, indicator: 'Hotel Operations', section: 'Revenue Management',
      question: 'What is the primary goal of yield management in the hotel industry?',
      options: {
        A: 'To maintain a consistent room rate throughout the year.',
        B: 'To maximize revenue by adjusting prices based on demand forecasting.',
        C: 'To reduce operational costs by limiting the number of available rooms.',
        D: 'To provide the lowest possible room rate to attract more guests.'
      },
      correctAnswer: 'B'
    },
    {
      id: 3, indicator: 'Tourism', section: 'Travel Planning',
      question: 'Which type of tourism involves visiting a destination to experience its culture, history, and heritage?',
      options: {
        A: 'Ecotourism',
        B: 'Adventure tourism',
        C: 'Cultural tourism',
        D: 'Medical tourism'
      },
      correctAnswer: 'C'
    },
    {
      id: 4, indicator: 'Event Management', section: 'Event Planning',
      question: 'What is the first step in the event planning process?',
      options: {
        A: 'Selecting a venue',
        B: 'Creating a budget',
        C: 'Defining the event objectives',
        D: 'Sending out invitations'
      },
      correctAnswer: 'C'
    },
    {
      id: 5, indicator: 'Food Service', section: 'Food Safety',
      question: 'At what temperature range do bacteria multiply most rapidly in food?',
      options: {
        A: '0°F to 32°F',
        B: '40°F to 140°F',
        C: '150°F to 200°F',
        D: '212°F and above'
      },
      correctAnswer: 'B'
    },
  ],
  'business-admin': [
    {
      id: 1, indicator: 'Business Law', section: 'Contracts',
      question: 'Which element is NOT required for a valid contract?',
      options: {
        A: 'Offer and acceptance',
        B: 'Consideration',
        C: 'A written document',
        D: 'Legal capacity of the parties'
      },
      correctAnswer: 'C'
    },
    {
      id: 2, indicator: 'Human Resources', section: 'Recruitment',
      question: 'Which recruitment method is most effective for filling highly specialized positions?',
      options: {
        A: 'Posting on general job boards.',
        B: 'Using employee referral programs exclusively.',
        C: 'Engaging specialized headhunters or executive search firms.',
        D: 'Posting on the company\'s internal bulletin board.'
      },
      correctAnswer: 'C'
    },
    {
      id: 3, indicator: 'Emotional Intelligence', section: 'Professional Traits',
      question: 'Assertiveness in the workplace primarily involves:',
      options: {
        A: 'Ensuring your perspective dominates team discussions.',
        B: 'Passive avoidance of controversial topics.',
        C: 'Respectfully expressing your needs and boundaries without violating those of others.',
        D: 'Admitting fault in all conflict scenarios to maintain harmony.'
      },
      correctAnswer: 'C'
    },
    {
      id: 4, indicator: 'Management', section: 'Leadership',
      question: 'Which leadership style involves making decisions without input from subordinates?',
      options: {
        A: 'Democratic',
        B: 'Laissez-faire',
        C: 'Autocratic',
        D: 'Transformational'
      },
      correctAnswer: 'C'
    },
    {
      id: 5, indicator: 'Ethics', section: 'Corporate Responsibility',
      question: 'What is the primary purpose of a company\'s code of ethics?',
      options: {
        A: 'To increase the company\'s stock price.',
        B: 'To provide guidelines for employee behavior and decision-making.',
        C: 'To replace all local and federal laws governing business conduct.',
        D: 'To serve as a marketing tool for attracting customers.'
      },
      correctAnswer: 'B'
    },
  ],
  'comprehensive': [
    {
      id: 1, indicator: 'Marketing Management', section: 'Wholesaling & Logistics',
      question: 'Which of the following best describes the role of a wholesaler in a marketing channel for industrial products?',
      options: {
        A: 'To provide direct technical support and installation services for complex manufacturing machinery to end-users.',
        B: 'To break bulk and consolidate shipments, reducing transportation costs and lead times for small-to-medium sized manufacturers.',
        C: 'To create and execute national advertising campaigns that focus on brand awareness for consumer packaged goods.',
        D: 'To act as a legal intermediary ensuring that all local government tariffs and international trade laws are strictly adhered to.'
      },
      correctAnswer: 'B'
    },
    {
      id: 2, indicator: 'Financial Analysis', section: 'Accounting Dynamics',
      question: 'If a company\'s current ratio increases while its quick ratio decreases, what is the most likely cause?',
      options: {
        A: 'An increase in short-term accounts payable.',
        B: 'A sudden liquidation of inventory assets.',
        C: 'A significant accumulation of inventory.',
        D: 'Issuing long-term bonds to pay off short-term liabilities.'
      },
      correctAnswer: 'C'
    },
    {
      id: 3, indicator: 'Emotional Intelligence', section: 'Professional Traits',
      question: 'Assertiveness in the workplace primarily involves:',
      options: {
        A: 'Ensuring your perspective dominates team discussions.',
        B: 'Passive avoidance of controversial topics.',
        C: 'Respectfully expressing your needs and boundaries without violating those of others.',
        D: 'Admitting fault in all conflict scenarios to maintain harmony.'
      },
      correctAnswer: 'C'
    },
    {
      id: 4, indicator: 'Pricing', section: 'Pricing Strategies',
      question: 'A company launches a new tech gadget at a very high initial price and gradually lowers it. This is an example of:',
      options: {
        A: 'Penetration pricing',
        B: 'Loss-leader pricing',
        C: 'Price skimming',
        D: 'Competitive pricing'
      },
      correctAnswer: 'C'
    },
    {
      id: 5, indicator: 'Risk Management', section: 'Insurance',
      question: 'Which type of risk can be reduced through diversification of a portfolio?',
      options: {
        A: 'Systematic risk',
        B: 'Unsystematic risk',
        C: 'Market risk',
        D: 'Interest rate risk'
      },
      correctAnswer: 'B'
    },
    {
      id: 6, indicator: 'Customer Relations', section: 'Service Quality',
      question: 'Which dimension of service quality refers to the ability to perform the promised service dependably and accurately?',
      options: {
        A: 'Tangibles',
        B: 'Reliability',
        C: 'Responsiveness',
        D: 'Empathy'
      },
      correctAnswer: 'B'
    },
    {
      id: 7, indicator: 'Business Law', section: 'Contracts',
      question: 'Which element is NOT required for a valid contract?',
      options: {
        A: 'Offer and acceptance',
        B: 'Consideration',
        C: 'A written document',
        D: 'Legal capacity of the parties'
      },
      correctAnswer: 'C'
    },
    {
      id: 8, indicator: 'Promotion', section: 'Advertising Strategy',
      question: 'Which promotional strategy uses a "push" approach to move products through the distribution channel?',
      options: {
        A: 'Running television commercials targeted at end consumers to create demand.',
        B: 'Offering trade discounts and incentives to wholesalers and retailers to stock products.',
        C: 'Creating a viral social media campaign to generate organic consumer interest.',
        D: 'Sponsoring a major sporting event to increase brand awareness.'
      },
      correctAnswer: 'B'
    },
    {
      id: 9, indicator: 'Hotel Operations', section: 'Revenue Management',
      question: 'What is the primary goal of yield management in the hotel industry?',
      options: {
        A: 'To maintain a consistent room rate throughout the year.',
        B: 'To maximize revenue by adjusting prices based on demand forecasting.',
        C: 'To reduce operational costs by limiting the number of available rooms.',
        D: 'To provide the lowest possible room rate to attract more guests.'
      },
      correctAnswer: 'B'
    },
    {
      id: 10, indicator: 'Management', section: 'Leadership',
      question: 'Which leadership style involves making decisions without input from subordinates?',
      options: {
        A: 'Democratic',
        B: 'Laissez-faire',
        C: 'Autocratic',
        D: 'Transformational'
      },
      correctAnswer: 'C'
    },
  ],
};

// Legacy export for backward compatibility
export const examQuestions = examQuestionsBank['comprehensive'].slice(0, 3);

export const coachInitialMessages = [
  {
    id: 1,
    sender: 'ai',
    performanceIndicator: null,
    text: `👋 **Welcome to DECA Coach!**\n\nI'm your AI-powered DECA competition tutor. I can help you with:\n\n- **Performance Indicators** — Ask me to explain any PI\n- **Exam Prep** — Practice questions and concept breakdowns\n- **Roleplay Coaching** — Tips for business scenario presentations\n- **Business Concepts** — Marketing, finance, hospitality, and more\n\nWhat would you like to work on today?`
  }
];
