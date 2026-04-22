export const careerClusters = [
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'campaign',
    color: '#0059a4',
    description: 'Develop strategies for product promotion, branding, advertising, and market research.',
    events: [
      'Principles of Marketing',
      'Marketing Communications',
      'Sports & Entertainment Marketing',
      'Advertising Campaign',
      'Integrated Marketing Campaign'
    ],
    piCount: 87
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: 'account_balance',
    color: '#1a7c5f',
    description: 'Master financial analysis, accounting, banking, and investment strategies.',
    events: [
      'Principles of Finance',
      'Business Finance',
      'Accounting Applications',
      'Financial Consulting',
      'Financial Services Team'
    ],
    piCount: 64
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    icon: 'hotel',
    color: '#b45309',
    description: 'Explore hotel management, restaurant operations, travel planning, and tourism.',
    events: [
      'Hotel & Lodging Management',
      'Quick Serve Restaurant Management',
      'Restaurant & Food Service Management',
      'Travel & Tourism',
      'Hospitality Services Team'
    ],
    piCount: 52
  },
  {
    id: 'business-admin',
    name: 'Business Administration',
    icon: 'business_center',
    color: '#6c5d38',
    description: 'Learn management principles, human resources, operations, and business law.',
    events: [
      'Principles of Business Administration',
      'Business Law & Ethics',
      'Human Resources Management',
      'Management Team',
      'Business Operations Research'
    ],
    piCount: 58
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    icon: 'rocket_launch',
    color: '#7c3aed',
    description: 'Build skills in startup planning, innovation, and new venture development.',
    events: [
      'Entrepreneurship',
      'Franchise Business Plan',
      'Independent Business Plan',
      'Innovation Plan',
      'Start-Up Business Plan'
    ],
    piCount: 31
  },
  {
    id: 'personal-finance',
    name: 'Personal Financial Literacy',
    icon: 'savings',
    color: '#dc2626',
    description: 'Understand budgeting, credit, insurance, investing, and financial planning.',
    events: [
      'Personal Financial Literacy',
      'Financial Literacy Promotion Project'
    ],
    piCount: 20
  }
];

export const decaEvents = {
  'marketing': [
    { id: 'pmk', name: 'Principles of Marketing', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Principles' },
    { id: 'mcs', name: 'Marketing Communications', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'sem', name: 'Sports & Entertainment Marketing', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'adc', name: 'Advertising Campaign', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' },
    { id: 'imc', name: 'Integrated Marketing Campaign', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' }
  ],
  'finance': [
    { id: 'pfl', name: 'Principles of Finance', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Principles' },
    { id: 'bfs', name: 'Business Finance', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'aap', name: 'Accounting Applications', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'fcs', name: 'Financial Consulting', type: 'Individual', format: 'Case Study', difficulty: 'Career Development' },
    { id: 'fst', name: 'Financial Services Team', type: 'Team', format: 'Case Study', difficulty: 'Career Development' }
  ],
  'hospitality': [
    { id: 'hlm', name: 'Hotel & Lodging Management', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'qsr', name: 'Quick Serve Restaurant Management', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'rfm', name: 'Restaurant & Food Service Management', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'ttd', name: 'Travel & Tourism', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'hst', name: 'Hospitality Services Team', type: 'Team', format: 'Case Study', difficulty: 'Career Development' }
  ],
  'business-admin': [
    { id: 'pba', name: 'Principles of Business Administration', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Principles' },
    { id: 'ble', name: 'Business Law & Ethics', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'hrm', name: 'Human Resources Management', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'mgt', name: 'Management Team', type: 'Team', format: 'Case Study', difficulty: 'Career Development' },
    { id: 'bor', name: 'Business Operations Research', type: 'Individual', format: 'Written + Presentation', difficulty: 'Career Development' }
  ],
  'entrepreneurship': [
    { id: 'enp', name: 'Entrepreneurship', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Career Development' },
    { id: 'fbp', name: 'Franchise Business Plan', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' },
    { id: 'ibp', name: 'Independent Business Plan', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' },
    { id: 'inp', name: 'Innovation Plan', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' },
    { id: 'sub', name: 'Start-Up Business Plan', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' }
  ],
  'personal-finance': [
    { id: 'pfl2', name: 'Personal Financial Literacy', type: 'Individual', format: 'Exam + Roleplay', difficulty: 'Principles' },
    { id: 'flp', name: 'Financial Literacy Promotion Project', type: 'Team', format: 'Written + Presentation', difficulty: 'Career Development' }
  ]
};

export const focusAreas = [
  { id: 'branding', name: 'Branding & Product Management', cluster: 'marketing' },
  { id: 'promotion', name: 'Promotion & Advertising', cluster: 'marketing' },
  { id: 'pricing', name: 'Pricing Strategies', cluster: 'marketing' },
  { id: 'market-research', name: 'Market Research & Analysis', cluster: 'marketing' },
  { id: 'digital', name: 'Digital Marketing & Social Media', cluster: 'marketing' },
  { id: 'accounting', name: 'Accounting Fundamentals', cluster: 'finance' },
  { id: 'investments', name: 'Investments & Risk Management', cluster: 'finance' },
  { id: 'banking', name: 'Banking & Credit Services', cluster: 'finance' },
  { id: 'taxation', name: 'Taxation & Compliance', cluster: 'finance' },
  { id: 'hotel-ops', name: 'Hotel Operations', cluster: 'hospitality' },
  { id: 'food-service', name: 'Food & Beverage Management', cluster: 'hospitality' },
  { id: 'tourism', name: 'Travel & Tourism Planning', cluster: 'hospitality' },
  { id: 'customer-service', name: 'Customer Service Excellence', cluster: 'hospitality' },
  { id: 'hr', name: 'Human Resources', cluster: 'business-admin' },
  { id: 'law', name: 'Business Law & Ethics', cluster: 'business-admin' },
  { id: 'operations', name: 'Operations Management', cluster: 'business-admin' },
  { id: 'startup', name: 'Startup Planning', cluster: 'entrepreneurship' },
  { id: 'innovation', name: 'Innovation & Ideation', cluster: 'entrepreneurship' },
  { id: 'budgeting', name: 'Personal Budgeting', cluster: 'personal-finance' },
  { id: 'credit', name: 'Credit & Debt Management', cluster: 'personal-finance' }
];
