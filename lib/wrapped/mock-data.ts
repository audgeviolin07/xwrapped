import { PersonaData, ReplyGuyData } from '@/types/wrapped';

export function getMockPersona(): PersonaData {
  const personas = [
    {
      title: "The Conversationalist",
      description: "You thrive in the replies, sparking discussions and building connections.",
      iconType: "chat"
    },
    {
      title: "The Thought Leader",
      description: "Your insights inspire others. You're shaping the conversation.",
      iconType: "lightbulb"
    },
    {
      title: "The Curator",
      description: "You share the best content, keeping your followers informed.",
      iconType: "bookmark"
    },
    {
      title: "The Lurker",
      description: "You're watching, learning, and taking it all in from the sidelines.",
      iconType: "eye"
    },
    {
      title: "The Connector",
      description: "You bring people together and build bridges across communities.",
      iconType: "link"
    }
  ];

  // Randomly select one for demo purposes
  const selected = personas[Math.floor(Math.random() * personas.length)];

  return {
    ...selected,
    isMock: true
  };
}

export function getMockReplyGuy(username: string): ReplyGuyData {
  const mockUsers = [
    { username: "elonmusk", name: "Elon Musk" },
    { username: "getify", name: "Kyle Simpson" },
    { username: "dan_abramov", name: "Dan Abramov" },
    { username: "kentcdodds", name: "Kent C. Dodds" },
    { username: "ThePrimeagen", name: "ThePrimeagen" }
  ];

  const selected = mockUsers[Math.floor(Math.random() * mockUsers.length)];

  return {
    username: selected.username,
    name: selected.name,
    profileImageUrl: undefined,
    replyCount: Math.floor(Math.random() * 100) + 10,
    isMock: true
  };
}

