import { Collapse } from "antd";

export default function Faq() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const items = [
    {
      key: "1",
      label: "What’s the maximum amount of text I can generate?",
      children: (
        <p>
          The maximum number of characters you can generate in a single request
          on the Platform is 2,500 for users that are not subscribed and 5,000
          for subscribed ones. Your total monthly character quota depends on
          your subscription tier - check your subscription page located under
          your profile to find your current usage.
        </p>
      ),
    },
    {
      key: "2",
      label: "Can the content I generate be used for commercial purposes?",
      children: (
        <p>
          Free tier subscribers must attribute ElevenLabs by including
          “elevenlabs.io” or “11.ai” in the title whenever publishing any
          content generated on the platform. No such attribution is required for
          any paid accounts which come with a commercial use license for content
          generated with default voices. You are responsible for all files you
          upload to and generate on the platform, and for the consequences of
          publishing those files elsewhere. If you are unsure about whether you
          can publish content featuring a cloned voice, we advise that you
          consider your domestic law’s stance on copyright before publishing any
          such content.
        </p>
      ),
    },
    {
      key: "3",
      label: "How do I change my subscription plan?",
      children: (
        <p>
          Log in to the Platform, then go to your profile by clicking the icon
          located in the top right corner of the screen, and select
          ‘Subscription’ from the drop-down menu. Next, choose the plan you’d
          like to switch to or contact us if you’re interested in
          Enterprise-level pricing.
        </p>
      ),
    },
    {
      key: "3",
      label: "Am I charged for every request?",
      children: (
        <p>
          We charge your character quota per-request, not per-download. This
          means that every time you click ‘Generate’, you will incur the
          character cost of your request. If you believe you’ve been charged by
          mistake or the requested file was never fetched even though you’ve
          been charged, please reach out to team[at]elevenlabs[dot]io
        </p>
      ),
    },
    {
      key: "3",
      label: "What is the billing interval?",
      children: (
        <p>
          We bill you on a monthly basis starting from the day you subscribed,
          you can cancel your subscription at any time.
        </p>
      ),
    },
    {
      key: "3",
      label: "At which point in time can I cancel my subscription?",
      children: (
        <p>
          You can cancel your subscription at any time. At the next billing
          cycle we will not resume your subscription and you will be downgraded
          to the Free tier.
        </p>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>FAQ</h1>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "50px",
        }}
        className="container"
      >
        <Collapse accordion items={items} defaultActiveKey={["1"]} />
      </div>
    </>
  );
}
