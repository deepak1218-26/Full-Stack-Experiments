
import React, { useState } from "react";
import "./App.css";

function App() {
  const [traffic, setTraffic] = useState(10);
  const [contractStatus, setContractStatus] = useState("");
  const [tests, setTests] = useState("All tests passed");
  const [deployStatus, setDeployStatus] = useState("Ready");

  const stages = [
    ["01", "Code Push", "Git repository", "✓"],
    ["02", "CI Trigger", "GitHub Actions", "✓"],
    ["03", "Build & Compile", "Maven build", "✓"],
    ["04", "Automated Tests", "JUnit & MockMvc", "✓"],
    ["05", "Docker Build", "Container image", "✓"],
    ["06", "Canary Rollout", "Staged deployment", "→"]
  ];

  const runContract = (breaking = false) => {
    setContractStatus(
      breaking
        ? "Schema mismatch detected. Contract validation failed."
        : "Contract verified successfully. All schemas are compatible."
    );
  };

  const runTests = () => {
    setTests("Running tests...");
    setTimeout(() => setTests("All tests passed — 18/18"), 1000);
  };

  const deploy = () => {
    setDeployStatus("Deployment initiated");
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>
          <div>
            <h2>Nova<span>Deploy</span></h2>
            <small>DEVOPS PLATFORM</small>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <a className="nav-item active">▦ <span>Overview</span></a>
        <a className="nav-item">⇄ <span>Pipeline</span></a>
        <a className="nav-item">◉ <span>Testing</span></a>
        <a className="nav-item">▤ <span>Deployments</span></a>
        <a className="nav-item">◇ <span>Containers</span></a>

        <div className="nav-label second-label">MANAGEMENT</div>
        <a className="nav-item">⚙ <span>Settings</span></a>
        <a className="nav-item">ⓘ <span>Documentation</span></a>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">DP</div>
            <div>
              <strong>Developer</strong>
              <small>Project workspace</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Workspace / <b>Experiment 09</b></div>
            <h1>CI/CD Dashboard</h1>
          </div>
          <div className="top-actions">
            <div className="backend-status">
              <span className="live-dot"></span>
              Backend Online
            </div>
            <div className="top-avatar">DP</div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <div className="eyebrow">EXPERIMENT 09 · UNIT 3</div>
            <h2>Build. Test. Deploy.</h2>
            <p>Monitor your continuous integration and delivery workflow from one place.</p>
          </div>
          <div className="welcome-art">
            <div className="art-circle">↗</div>
            <div className="art-text">
              <strong>Pipeline status</strong>
              <span>All systems operational</span>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Builds</span>
              <span className="stat-icon blue">▤</span>
            </div>
            <h2>24</h2>
            <small>Pipeline executions</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <span>Successful Tests</span>
              <span className="stat-icon green">✓</span>
            </div>
            <h2>18</h2>
            <small>Tests passed</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <span>Failed Tests</span>
              <span className="stat-icon red">×</span>
            </div>
            <h2>0</h2>
            <small>No test failures reported</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">
              <span>Deployment</span>
              <span className="stat-icon purple">↗</span>
            </div>
            <h2 className="status-ready">Ready</h2>
            <small>Canary deployment control</small>
          </div>
        </section>

        <section className="panel pipeline-panel">
          <div className="section-heading">
            <div>
              <h3>Deployment Pipeline</h3>
              <p>Complete CI/CD automated workflow</p>
            </div>
            <span className="success-pill">● Pipeline Ready</span>
          </div>

          <div className="pipeline">
            {stages.map((stage, index) => (
              <React.Fragment key={stage[0]}>
                <div className={`stage ${index === 5 ? "stage-current" : ""}`}>
                  <div className="stage-number">{stage[0]}</div>
                  <div className="stage-check">{stage[3]}</div>
                  <strong>{stage[1]}</strong>
                  <small>{stage[2]}</small>
                  <span className="stage-status">
                    {index === 5 ? "READY" : "COMPLETED"}
                  </span>
                </div>
                {index !== stages.length - 1 && (
                  <div className="pipeline-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="content-grid">
          <section className="panel canary-panel">
            <div className="section-heading">
              <div>
                <h3>Canary Deployment</h3>
                <p>Manage staged traffic distribution</p>
              </div>
              <span className="live-label">LIVE CONTROL</span>
            </div>

            <div className="version-row">
              <div className="version-box stable">
                <span className="version-dot"></span>
                <div>
                  <strong>Stable Version</strong>
                  <small>v1.0.0</small>
                </div>
              </div>
              <div className="version-box canary">
                <span className="version-dot"></span>
                <div>
                  <strong>Canary Version</strong>
                  <small>v2.0.0</small>
                </div>
              </div>
            </div>

            <div className="traffic-header">
              <label>Canary Traffic Weight</label>
              <strong>{traffic}%</strong>
            </div>

            <input
              className="traffic-slider"
              type="range"
              min="0"
              max="100"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              style={{ "--progress": `${traffic}%` }}
            />

            <div className="traffic-labels">
              <span>0% Canary</span>
              <span>100% Canary</span>
            </div>

            <div className="traffic-visual">
              <div className="traffic-stable" style={{ width: `${100 - traffic}%` }}>
                <strong>{100 - traffic}%</strong>
                <span>Stable</span>
              </div>
              <div className="traffic-canary" style={{ width: `${traffic}%` }}>
                {traffic >= 15 && <strong>{traffic}%</strong>}
                {traffic >= 25 && <span>Canary</span>}
              </div>
            </div>

            <div className="deployment-info">
              <span>Deployment status</span>
              <strong>{deployStatus}</strong>
            </div>

            <button className="primary-btn full-btn" onClick={deploy}>
              ↗ Apply Traffic Configuration
            </button>
          </section>

          <section className="panel contract-panel">
            <div className="section-heading">
              <div>
                <h3>Contract Testing</h3>
                <p>Validate frontend and backend compatibility</p>
              </div>
              <span className="contract-icon">◇</span>
            </div>

            <div className="contract-info">
              <div className="contract-line">
                <span>Frontend expects</span>
                <code>{'{ name: "XYZ" }'}</code>
              </div>
              <div className="contract-line">
                <span>Backend sends</span>
                <code>{'{ username: "XYZ" }'}</code>
              </div>
            </div>

            <div className="contract-description">
              Contract testing detects schema changes before they reach production.
            </div>

            <button
              className="primary-btn full-btn"
              onClick={() => runContract(false)}
            >
              ✓ Verify Compliant Contract
            </button>

            <button
              className="danger-btn full-btn"
              onClick={() => runContract(true)}
            >
              ⚠ Simulate Breaking Schema
            </button>

            {contractStatus && (
              <div className={`result-box ${contractStatus.includes("failed") ? "error-result" : "success-result"}`}>
                {contractStatus}
              </div>
            )}
          </section>
        </div>

        <div className="content-grid lower-grid">
          <section className="panel">
            <div className="section-heading">
              <div>
                <h3>Automated Testing</h3>
                <p>JUnit and MockMvc test execution</p>
              </div>
              <span className="success-pill">18/18 PASSED</span>
            </div>

            <div className="test-summary">
              <div className="test-circle">
                <strong>100%</strong>
                <small>Pass rate</small>
              </div>
              <div className="test-details">
                <div><span className="green-dot"></span> Passed <strong>18</strong></div>
                <div><span className="red-dot"></span> Failed <strong>0</strong></div>
                <div><span className="grey-dot"></span> Skipped <strong>0</strong></div>
              </div>
            </div>

            <div className="test-message">{tests}</div>
            <button className="secondary-btn full-btn" onClick={runTests}>
              ↻ Run Test Check
            </button>
          </section>

          <section className="panel">
            <div className="section-heading">
              <div>
                <h3>Docker & Infrastructure</h3>
                <p>Containerization overview</p>
              </div>
              <span className="docker-icon">▣</span>
            </div>

            <div className="infra-item">
              <div className="infra-icon blue">▣</div>
              <div><strong>Frontend Application</strong><small>Vite Development Server</small></div>
              <span className="online-status">Online</span>
            </div>
            <div className="infra-item">
              <div className="infra-icon purple">☕</div>
              <div><strong>Backend Application</strong><small>Spring Boot · Port 8080</small></div>
              <span className="online-status">Online</span>
            </div>
            <div className="infra-item">
              <div className="infra-icon orange">◈</div>
              <div><strong>Docker Configuration</strong><small>Container environment</small></div>
              <span className="ready-status">Configured</span>
            </div>
          </section>
        </div>

        <footer>
          <span>NovaDeploy · Experiment 09</span>
          <span>CI/CD Pipeline with Testing & Staged Deployment</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
