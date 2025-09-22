import React from 'react';

function Home({ navigateTo, score }) {
  const modules = [
    { id: 'addition', name: 'Addition', icon: '➕', color: 'primary' },
    { id: 'before', name: 'Comes Before', icon: '⬅️', color: 'success' },
    { id: 'after', name: 'Comes After', icon: '➡️', color: 'warning' },
    { id: 'between', name: 'Comes Between', icon: '↔️', color: 'info' }
  ];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card card-custom p-4 text-center">
            <h1 className="display-4 fw-bold text-primary mb-3">
              🎓 UKG Math Learning
            </h1>
            <p className="lead text-muted mb-4">
              Let's learn math together!
            </p>
            
            <div className="d-flex justify-content-center align-items-center mb-4 p-3 bg-light rounded-3">
              <span className="fw-semibold me-3">Your Stars:</span>
              {[...Array(Math.min(Math.floor(score/10), 10))].map((_, i) => (
                <span key={i} className="text-warning fs-4">⭐</span>
              ))}
              <span className="text-muted ms-3">({score} points)</span>
            </div>

            <div className="row g-3">
              {modules.map((module) => (
                <div key={module.id} className="col-12 col-md-6">
                  <button
                    className={`btn btn-${module.color} btn-custom w-100 py-4`}
                    onClick={() => navigateTo(module.id)}
                    style={{ fontSize: '20px', minHeight: '100px' }}
                  >
                    <div className="fs-1 mb-2">{module.icon}</div>
                    {module.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;