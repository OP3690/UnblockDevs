'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, FlowDiagram,
} from '@/components/blog/BlogVisuals';

export default function DigitalTwinsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Digital Twins — Complete Guide: What They Are and How They Work</h1>
      <p className="lead">
        A digital twin is a real-time virtual replica of a physical object, process, or system.
        Sensors stream data from the physical world to the digital model, enabling simulation,
        monitoring, and optimization without touching the real thing. From jet engines to cities,
        digital twins are transforming how we build and operate complex systems.
      </p>

      <StatGrid stats={[
        { value: '$73B', label: 'digital twin market size by 2027', color: 'blue' },
        { value: 'Real-time', label: 'synchronization with physical counterpart', color: 'green' },
        { value: '25%', label: 'reduction in unplanned downtime with predictive maintenance', color: 'purple' },
        { value: 'NASA', label: 'pioneered digital twins for Apollo missions in 1960s', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Digital Twin?" />
      <QuickFact>
        A digital twin is not just a 3D model — it's a living, data-driven replica. IoT sensors
        continuously feed data from the physical asset to the virtual model. The twin can be used
        to simulate scenarios, predict failures, optimize operations, and test changes before
        applying them to the real system.
      </QuickFact>

      <FlowDiagram
        title="Digital Twin Data Flow"
        steps={[
          { label: 'Physical Asset', description: 'Engine, building, factory, city — the real thing' },
          { label: 'IoT Sensors', description: 'Temperature, pressure, vibration, location, power consumption' },
          { label: 'Data Integration', description: 'Real-time streaming to cloud platform (Azure IoT, AWS IoT, GCP)' },
          { label: 'Digital Twin Model', description: 'Virtual replica updated with real-time sensor data' },
          { label: 'Analytics & AI', description: 'Anomaly detection, predictive maintenance, simulation' },
          { label: 'Actions', description: 'Alerts, automated adjustments, operator decisions' },
        ]}
      />

      <SectionHeader number={2} title="Types of Digital Twins" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Component Twin', description: 'Models a single component: a pump, bearing, or sensor. Most granular level — used for condition monitoring and failure prediction.' },
        { title: 'Asset Twin', description: 'Models a complete asset: a wind turbine, aircraft engine, or machine tool. Combines multiple component twins into a system view.' },
        { title: 'System Twin', description: 'Models how multiple assets work together: an entire factory floor, power grid segment, or hospital wing. Enables system-level optimization.' },
        { title: 'Process Twin', description: 'Models an end-to-end process: supply chain, patient flow, or manufacturing workflow. Used for process optimization and bottleneck identification.' },
      ]} />

      <SectionHeader number={3} title="Digital Twins vs Simulation" />
      <CompareTable
        leftLabel="Traditional Simulation"
        rightLabel="Digital Twin"
        rows={[
          { label: 'Data source', left: 'Historical data, theoretical models', right: 'Real-time sensor data from physical asset' },
          { label: 'Sync', left: 'Point-in-time — static snapshot', right: 'Continuously synchronized with reality' },
          { label: 'Purpose', left: 'Design validation, one-time analysis', right: 'Ongoing monitoring, prediction, optimization' },
          { label: 'Accuracy', left: 'Degrades as asset ages/changes', right: 'Always reflects actual asset state' },
          { label: 'Feedback loop', left: 'None — simulation doesn\'t affect asset', right: 'Bidirectional — insights drive real-world actions' },
        ]}
      />

      <SectionHeader number={4} title="Real-World Use Cases" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Aerospace (GE Aviation)', description: 'Every GE jet engine has a digital twin. Sensor data from flights feeds models that predict maintenance needs before failures occur. Avoids costly unplanned grounding.' },
        { title: 'Smart Cities (Singapore)', description: 'Singapore\'s Virtual Singapore is a 3D digital twin of the entire city. Used for urban planning, emergency response simulation, and solar panel placement optimization.' },
        { title: 'Healthcare', description: 'Patient digital twins model individual physiology. Used to simulate drug interactions, predict surgical outcomes, and personalize treatment plans without physical trials.' },
        { title: 'Manufacturing (Siemens)', description: 'Factory digital twins simulate production lines before physical installation. Identifies bottlenecks and optimizes machine placement. Reduces time-to-production by months.' },
      ]} />

      <SectionHeader number={5} title="Building a Simple Digital Twin" />
      <CodeBlock language="python" filename="IoT Sensor → Digital Twin State">
{`import asyncio
import json
from datetime import datetime

class DigitalTwin:
    """Simple digital twin for an industrial pump"""

    def __init__(self, asset_id: str):
        self.asset_id = asset_id
        self.state = {
            "temperature_c": 0,
            "pressure_bar": 0,
            "vibration_g": 0,
            "rpm": 0,
            "last_updated": None,
            "health_score": 100,
            "alerts": []
        }

    def update_from_sensor(self, sensor_data: dict):
        """Update twin state with real-time sensor reading"""
        self.state.update(sensor_data)
        self.state["last_updated"] = datetime.utcnow().isoformat()
        self._evaluate_health()

    def _evaluate_health(self):
        """AI/rules-based health assessment"""
        alerts = []

        if self.state["temperature_c"] > 90:
            alerts.append({"type": "WARNING", "msg": "High temperature — check cooling"})
        if self.state["vibration_g"] > 0.5:
            alerts.append({"type": "CRITICAL", "msg": "Excessive vibration — bearing failure risk"})

        # Health score degrades with anomalies
        self.state["health_score"] = max(0, 100 - len(alerts) * 20)
        self.state["alerts"] = alerts

    def predict_failure_days(self) -> int:
        """Simplified predictive model"""
        if self.state["vibration_g"] > 0.3:
            return max(1, int(30 * (0.5 / self.state["vibration_g"])))
        return 365  # Healthy

twin = DigitalTwin("PUMP-001")
twin.update_from_sensor({"temperature_c": 85, "vibration_g": 0.45, "rpm": 1500})
print(f"Health: {twin.state['health_score']}%, Predicted failure: {twin.predict_failure_days()} days")`}
      </CodeBlock>

      <AlertBox type="tip" title="Cloud platforms for Digital Twins">
        Azure Digital Twins (fully managed, graph-based), AWS IoT TwinMaker, GCP partner ecosystem.
        All provide real-time ingestion, model management, and visualization. Azure Digital Twins
        has the most mature offering with native DTDL modeling language.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between a digital twin and a BIM model?',
          answer: 'BIM (Building Information Modeling) is a static, design-phase 3D model of a building — excellent for construction planning. A digital twin is a living operational model connected to the real building\'s sensors. A BIM can become a digital twin when connected to real-time IoT data.',
        },
        {
          question: 'How much does it cost to build a digital twin?',
          answer: 'Simple asset twins: $50K-$500K for setup including sensors, connectivity, and modeling. Complex factory or city twins: $1M-$100M+. Cloud platform costs: Azure Digital Twins starts at $0.001 per message, affordable at IoT scale. The major cost is sensor installation and integration work, not the software.',
        },
        {
          question: 'What technology stack powers most digital twins?',
          answer: 'IoT layer: MQTT protocol, Azure IoT Hub or AWS IoT Core. Time-series storage: InfluxDB, TimescaleDB, or Azure Data Explorer. Modeling: Azure Digital Twins (DTDL), or custom graph databases. Visualization: Unity, Unreal Engine, or Tableau for 3D/2D views. AI: Azure ML or Python-based anomaly detection.',
        },
        {
          question: 'Can digital twins be used for people?',
          answer: 'Yes — medical digital twins model individual patients for treatment simulation. Athletes use digital twins for performance optimization. However, this raises significant ethical and privacy questions. Regulatory frameworks are still evolving for human digital twins in healthcare.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
