const categories = [
  { id: 1, name: "General" },
  { id: 2, name: "Enterprises" },
  { id: 3, name: "Contributors" },
  { id: 4, name: "Technical" },
  { id: 5, name: "Tokenomics" },
];

const general = [
  {
    id: 1,
    data: [
      {
        id: "1",
        question: "What is Shwet?",
        answer:
          "Shwet is an open-source collaboration tool for data AI and ML projects, similar to GitHub but focused on data processing and cleaning. It allows project maintainers to post task batches for data processing, and contributors can complete these tasks to earn rewards in our native crypto token.",
      },

      {
        id: "2",
        question: "How is Shwet different from other platforms?",
        answer: "Shwet combines the collaborative aspects of GitHub with the data-focused approach of platforms like Hugging Face. It uniquely incentivizes contributors with crypto rewards for completing data processing tasks, creating a win-win ecosystem for both project maintainers and contributors.",
      },
      {
        id: "3",
        question: "Is Shwet free to use?",
        answer: "Yes, Shwet is an open-source platform and is free to use. However, project maintainers may need to allocate tokens for rewards when posting tasks.",
      },
    ],
  },
];

const maintainers = [
  {
    id: 2,
    data: [
      {
        id: "6",
        question: "How do I post a task batch on Shwet?",
          answer: "To post a task batch, log into your Shwet account, navigate to your project dashboard, and click on 'Create New Task Batch'. You'll need to provide details about the data processing requirements, the number of items to be processed, and the reward amount per task or for the entire batch.",
      },
      
      {
        id: "7",
        question: "How do I set rewards for tasks?",
        answer: "When creating a task batch, you can specify the reward amount in Shwet tokens. You can set a fixed amount per task or a total amount for the entire batch. Make sure you have sufficient tokens in your account to cover the rewards.",
      },
      {
        id: "8",
        question: "How can I ensure the quality of processed data?",
          answer: "Shwet provides tools for quality control, including random sampling for review, setting up validation tasks, and implementing a reputation system for contributors. You can also set specific criteria or guidelines for task completion.",
      },
    ],
  },
];

const contributors = [
  {
    id: 3,
    data: [
      {
        id: "11",
        question: "How do I start contributing on Shwet?",
        answer: "To start contributing, create a Shwet account, browse available task batches, and select tasks that match your skills and interests. Complete the tasks according to the provided guidelines, and submit your work for review.",
      },
      {
        id: "12",
        question: "How do I earn rewards on Shwet?",
          answer: "You earn rewards by successfully completing tasks posted by project maintainers. Once your submitted work is approved, the specified reward amount in Shwet tokens will be credited to your account.",
      },
      {
        id: "13",
        question: "Can I withdraw my earned tokens?",
        answer: "Yes, you can withdraw your earned Shwet tokens to compatible crypto wallets or exchange them on supported cryptocurrency exchanges. Check the 'Wallet' section in your account for withdrawal options and any associated fees.",
      },
    ],
  },
];
const technical = [
  {
    id: 4,
    data: [
      {
        id: "16",
        question: "What types of data processing tasks are supported on Shwet?",
        answer: "Shwet supports a wide range of data processing tasks, including but not limited to data cleaning, labeling, annotation, classification, and validation. The specific tasks depend on the requirements set by project maintainers.",
      },
      {
        id: "17",
        question: "What types of data processing tasks are supported on Shwet?",
          answer: "Shwet supports a wide range of data processing tasks, including but not limited to data cleaning, labeling, annotation, classification, and validation. The specific tasks depend on the requirements set by project maintainers.",
      },
      {
        id: "18",
        question: "Is there an API available for integrating Shwet with other tools?",
        answer: "Yes, Shwet provides a comprehensive API that allows integration with various data science and machine learning tools. You can find the API documentation in our developer resources section.",
      },
    ],
  },
];
const tokenomics = [
  {
    id: 4,
    data: [
      {
        id: "16",
        question: "What is the Shwet token and how does it work?",
          answer: "The Shwet token is our native cryptocurrency used for rewarding contributors. It's based on blockchain technology and can be earned by completing tasks, traded on supported exchanges, or used within the Shwet ecosystem.",
      },
      {
        id: "17",
        question: "How is the value of Shwet tokens determined?",
          answer: "The value of Shwet tokens is determined by market forces, including supply and demand on cryptocurrency exchanges where it's listed. The token's utility within the Shwet ecosystem also influences its value.",
      },
      {
        id: "18",
        question: "Are there any fees for using Shwet tokens?",
        answer: "There may be small transaction fees for transferring Shwet tokens, depending on the blockchain network load. These fees are used to process and secure transactions on the network.",
      },
    ],
  },
];

export { categories, general, maintainers, contributors, technical, tokenomics };
