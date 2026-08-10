const steps = [
  { n: '01', title: 'UPLOAD', body: 'Drop your face in. We auto-fit any portrait or landscape shot, fully client-side.' },
  { n: '02', title: 'DISCOVER', body: 'Your name, handle and stack are hashed into a deterministic Builder DNA.' },
  { n: '03', title: 'ASSEMBLE', body: 'Recruit up to two more builders and fuse your signals into one Crew Passport.' },
  { n: '04', title: 'SHIP IT', body: 'Export a high-resolution card and drop it on X. #FrameInGoa.' },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <p className="section-kicker">HOW IT WORKS</p>
      <div className="how-grid">
        {steps.map((step) => (
          <div className="how-card" key={step.n}>
            <b>{step.n}</b>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
