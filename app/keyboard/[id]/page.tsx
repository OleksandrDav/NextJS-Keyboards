
export default function KeyboardPage({params: {id}}: {params: {id: string}}) {
  return (
    <div>
      <h1>Keyboard Details</h1>
      <p>Keyboard ID: {id}</p>
    </div>
  );
}
