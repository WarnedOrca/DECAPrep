export const performanceIndicators = [
  {
    id: 'MK:015',
    title: 'Analyze the use of branding for a product',
    cluster: 'Marketing',
    topic: 'Branding',
    difficulty: 'Specialist',
    mastery: 'Gold',
    icon: 'workspace_premium',
    color: 'tertiary'
  },
  {
    id: 'FI:579',
    title: 'Discuss the impact of economic conditions on taxation',
    cluster: 'Finance',
    topic: 'Economics',
    difficulty: 'Core',
    mastery: 'Silver',
    icon: 'workspace_premium',
    color: 'slate'
  },
  {
    id: 'EI:011',
    title: 'Assess personal interests and skills for careers',
    cluster: 'Hospitality',
    topic: 'Emotional Intelligence',
    difficulty: 'Prerequisite',
    mastery: 'Bronze',
    icon: 'workspace_premium',
    color: 'orange'
  },
  {
    id: 'CO:025',
    title: 'Explain the nature of effective verbal communications',
    cluster: 'Business Admin',
    topic: 'Communications',
    difficulty: 'Core',
    mastery: 'None',
    icon: 'workspace_premium',
    color: 'slate',
    fill0: true
  },
  {
    id: 'IM:421',
    title: 'Determine research tools of primary data collection',
    cluster: 'Marketing',
    topic: 'Information Management',
    difficulty: 'Specialist',
    mastery: 'Gold',
    icon: 'workspace_premium',
    color: 'tertiary'
  },
  {
    id: 'NF:015',
    title: 'Demonstrate use of database software',
    cluster: 'Finance',
    topic: 'Information Technology',
    difficulty: 'Prerequisite',
    mastery: 'Silver',
    icon: 'workspace_premium',
    color: 'slate'
  }
];

export const examQuestions = [
  {
    id: 1,
    indicator: 'Marketing Management',
    section: 'Wholesaling & Logistics',
    question: 'Which of the following best describes the role of a wholesaler in a marketing channel for industrial products?',
    options: {
      A: 'To provide direct technical support and installation services for complex manufacturing machinery to end-users.',
      B: 'To break bulk and consolidate shipments, reducing transportation costs and lead times for small-to-medium sized manufacturers.',
      C: 'To create and execute national advertising campaigns that focus on brand awareness for consumer packaged goods.',
      D: 'To act as a legal intermediary ensuring that all local government tariffs and international trade laws are strictly adhered to.'
    },
    correctAnswer: 'B',
    explanation:
      'A wholesaler adds value by managing inventory volume and shipment efficiency between producers and smaller buyers. That makes option B correct because it focuses on breaking bulk and reducing logistics friction.'
  },
  {
    id: 2,
    indicator: 'Financial Analysis',
    section: 'Accounting Dynamics',
    question: 'If a company\'s current ratio increases while its quick ratio decreases, what is the most likely cause?',
    options: {
      A: 'An increase in short-term accounts payable.',
      B: 'A sudden liquidation of inventory assets.',
      C: 'A significant accumulation of inventory.',
      D: 'Issuing long-term bonds to pay off short-term liabilities.'
    },
    correctAnswer: 'C',
    explanation:
      'The current ratio includes inventory, but the quick ratio does not. If inventory grows a lot, the current ratio can rise while the quick ratio falls or lags, which points to option C.'
  },
  {
    id: 3,
    indicator: 'Emotional Intelligence',
    section: 'Professional Traits',
    question: 'Assertiveness in the workplace primarily involves:',
    options: {
      A: 'Ensuring your perspective dominates team discussions.',
      B: 'Passive avoidance of controversial topics.',
      C: 'Respectfully expressing your needs and boundaries without violating those of others.',
      D: 'Admitting fault in all conflict scenarios to maintain harmony.'
    },
    correctAnswer: 'C',
    explanation:
      'Assertiveness is balanced communication. It is not aggression or avoidance, so the best answer is C because it protects both your needs and the other person’s boundaries.'
  }
];

export const coachInitialMessages = [
  {
    id: 1,
    sender: 'user',
    text: 'Explain the concept of marketing mix and how it relates to competitive advantage.'
  },
  {
    id: 2,
    sender: 'ai',
    performanceIndicator: 'MT:001',
    text: `The **Marketing Mix**, often referred to as the "4 Ps" (Product, Price, Place, Promotion), is the tactical toolkit used by marketers to influence consumer demand.\n\n- **Product:** The core offering that solves a customer problem.\n- **Price:** Value exchange.\n- **Place:** Distribution strategy.\n- **Promotion:** Communication channels.\n\n*"Competitive advantage is achieved when a firm crafts a Marketing Mix that is either more cost-efficient or more uniquely valuable than its rivals."*`
  }
];
