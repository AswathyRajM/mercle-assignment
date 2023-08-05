import EngagementMessagesOverTime from './EngagemetMessages';

function App() {
  const container = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C0C0F',
  };
  const style = {
    width: 'calc(100vw * (2 / 3))',
    height: 'calc(100vh * (2 / 3))',
  };
  return (
    <>
      <div style={container}>
        <div style={style}>
          <EngagementMessagesOverTime />
        </div>
      </div>
    </>
  );
}

export default App;
