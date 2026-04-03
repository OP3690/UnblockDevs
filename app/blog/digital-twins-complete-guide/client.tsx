'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function DigitalTwinsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Digital Twins — Complete Guide: What They Are and How They Work</h1>
      <p className="lead">
        A digital twin is a real-time virtual replica of a physical object, process, or system.
        Sensors stream data from the physical world to the digital model, enabling simulation,
        monitoring, and optimization without touching the real thing. From jet engines to entire cities,
        digital twins are transforming how we build, monitor, and optimize complex systems.
      </p>

      <StatGrid stats={[
        { value: '$73B', label: 'digital twin market size by 2027', color: 'blue' },
        { value: 'Real-time', label: 'synchronization with physical counterpart via IoT sensors', color: 'green' },
        { value: '25%', label: 'reduction in unplanned downtime with predictive maintenance', color: 'purple' },
        { value: 'NASA', label: 'pioneered digital twins for Apollo missions in the 1960s', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is a Digital Twin?" />
      <QuickFact color="blue" label="More than a 3D model">
        A digital twin is not just a 3D model — it's a living, data-driven replica. IoT sensors
        continuously feed data from the physical asset to the virtual model. The twin can be used
        to simulate scenarios, predict failures, optimize operations, and test changes before
        applying them to the real system — reducing risk and cost.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Physical asset generates data', desc: 'IoT sensors on the physical object (engine, building, factory machine) continuously measure temperature, pressure, vibration, power consumption, location, and other operational parameters at millisecond intervals.' },
        { title: 'Data streams to the cloud', desc: 'Sensor data is transmitted via MQTT or AMQP protocol to an IoT gateway (Azure IoT Hub, AWS IoT Core, GCP IoT Core). The gateway handles authentication, buffering, and routing to downstream processing systems.' },
        { title: 'Digital twin model is updated', desc: 'The cloud platform updates the virtual model with incoming sensor data in real-time. The twin\'s state always reflects the current actual state of the physical asset — down to individual component readings.' },
        { title: 'Analytics and AI run on the twin', desc: 'Machine learning models analyze the twin\'s state: anomaly detection identifies unusual patterns before they become failures. Predictive models estimate remaining useful life. Simulation runs "what if" scenarios safely on the virtual copy.' },
        { title: 'Insights trigger actions', desc: 'When the analytics detect an anomaly or predict a failure, the system triggers actions: maintenance alerts to operators, automated parameter adjustments, work order creation, or supply chain updates for required parts.' },
        { title: 'Actions feed back to the physical asset', desc: 'Corrective actions are applied to the real asset (adjusting parameters, scheduling maintenance). The physical asset\'s response is captured by sensors, updating the twin — completing the feedback loop that makes digital twins more accurate over time.' },
      ]} />

      <SectionHeader number={2} title="Types of Digital Twins" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Component Twin', description: 'Models a single component: a pump, bearing, sensor, or valve. Most granular level — used for condition monitoring and failure prediction of individual parts. Tracks wear patterns specific to that component.' },
        { title: 'Asset Twin', description: 'Models a complete asset: a wind turbine, aircraft engine, machine tool, or HVAC unit. Combines multiple component twins into a unified system view. GE Aviation uses asset twins for every jet engine it manufactures.' },
        { title: 'System Twin', description: 'Models how multiple assets work together: an entire factory floor, power grid segment, water treatment plant, or hospital wing. Enables system-level optimization — identifying how one asset\'s state affects others.' },
        { title: 'Process Twin', description: 'Models an end-to-end process: supply chain, patient flow through a hospital, or manufacturing workflow. Used for process optimization, bottleneck identification, and "what if" simulation of process changes before implementing them.' },
      ]} />

      <SectionHeader number={3} title="Digital Twins vs Traditional Simulation" />
      <CompareTable
        leftLabel="Traditional Simulation"
        rightLabel="Digital Twin"
        rows={[
          { label: 'Data source', left: 'Historical data and theoretical models', right: 'Real-time sensor data from the physical asset' },
          { label: 'Synchronization', left: 'Point-in-time — static snapshot of a past state', right: 'Continuously synchronized with the physical asset' },
          { label: 'Purpose', left: 'Design validation, one-time analysis', right: 'Ongoing monitoring, prediction, optimization' },
          { label: 'Model accuracy', left: 'Degrades as the asset ages, wears, and changes', right: 'Always reflects actual asset state — improves with data' },
          { label: 'Feedback loop', left: 'None — simulation doesn\'t affect the real asset', right: 'Bidirectional — insights drive real-world actions' },
          { label: 'When used', left: 'Primarily in design and testing phase', right: 'Throughout entire operational lifetime of the asset' },
        ]}
      />

      <SectionHeader number={4} title="Real-World Use Cases" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Aerospace — GE Aviation', description: 'Every GE jet engine has a digital twin. Sensor data from thousands of flights feeds predictive models that identify maintenance needs 10-30 days before failures would occur. Avoids costly unplanned groundings that cost airlines $150K+ per hour per aircraft.' },
        { title: 'Smart Cities — Singapore', description: 'Singapore\'s Virtual Singapore is a detailed 3D digital twin of the entire city. Used for urban planning simulations, emergency response optimization, solar panel placement analysis, and noise pollution modeling — without disrupting the real city.' },
        { title: 'Healthcare — Patient Twins', description: 'Patient digital twins model individual physiology from medical records, genomics, and wearable data. Used to simulate drug interactions, predict surgical outcomes, and personalize treatment plans. Reduces need for invasive testing.' },
        { title: 'Manufacturing — Siemens', description: 'Factory digital twins simulate entire production lines before physical installation. Identifies bottlenecks, optimizes machine placement, and validates robot programs virtually. Reduces time-to-production by months and avoids costly physical rework.' },
        { title: 'Energy — Wind Farms', description: 'Each wind turbine has a digital twin tracking blade pitch, rotor speed, and vibration. Farm-level twins optimize turbine positioning (wake effects) and predict grid output. Orsted reported 10-15% efficiency gains from digital twin optimization.' },
        { title: 'Construction — BIM Evolution', description: 'Building Information Models (BIM) become digital twins when connected to building management systems, IoT sensors, and occupancy data. Tracks HVAC efficiency, predicts maintenance, and optimizes energy consumption throughout the building\'s operational life.' },
      ]} />

      <SectionHeader number={5} title="Building a Simple Digital Twin" />
      <CodeBlock language="python" filename="IoT Sensor → Digital Twin State">
{`import asyncio
import json
from datetime import datetime
from typing import Optional

class DigitalTwin:
    """Simple digital twin for an industrial pump with predictive analytics"""

    TEMPERATURE_WARNING_C = 85
    TEMPERATURE_CRITICAL_C = 100
    VIBRATION_WARNING_G = 0.3
    VIBRATION_CRITICAL_G = 0.5

    def __init__(self, asset_id: str, asset_name: str):
        self.asset_id = asset_id
        self.asset_name = asset_name
        self.state = {
            "temperature_c": 0.0,
            "pressure_bar": 0.0,
            "vibration_g": 0.0,
            "rpm": 0,
            "power_kw": 0.0,
            "last_updated": None,
            "health_score": 100,
            "alerts": [],
            "operational_hours": 0,
        }
        self._reading_history = []

    def update_from_sensor(self, sensor_data: dict) -> None:
        """Update twin state with real-time sensor reading"""
        self.state.update(sensor_data)
        self.state["last_updated"] = datetime.utcnow().isoformat() + "Z"
        self._reading_history.append({**sensor_data, "timestamp": self.state["last_updated"]})
        if len(self._reading_history) > 1000:
            self._reading_history.pop(0)  # keep rolling window
        self._evaluate_health()

    def _evaluate_health(self) -> None:
        """Rules-based health assessment — real systems use ML models"""
        alerts = []
        health_deductions = 0

        # Temperature checks
        if self.state["temperature_c"] > self.TEMPERATURE_CRITICAL_C:
            alerts.append({"severity": "CRITICAL", "code": "TEMP_HIGH",
                          "msg": f"Critical temperature {self.state['temperature_c']}°C — shutdown risk"})
            health_deductions += 40
        elif self.state["temperature_c"] > self.TEMPERATURE_WARNING_C:
            alerts.append({"severity": "WARNING", "code": "TEMP_ELEVATED",
                          "msg": f"Elevated temperature {self.state['temperature_c']}°C — check cooling"})
            health_deductions += 15

        # Vibration checks (bearing failure indicator)
        if self.state["vibration_g"] > self.VIBRATION_CRITICAL_G:
            alerts.append({"severity": "CRITICAL", "code": "VIB_HIGH",
                          "msg": "Excessive vibration — imminent bearing failure risk"})
            health_deductions += 50
        elif self.state["vibration_g"] > self.VIBRATION_WARNING_G:
            alerts.append({"severity": "WARNING", "code": "VIB_ELEVATED",
                          "msg": "Elevated vibration — schedule bearing inspection"})
            health_deductions += 20

        self.state["health_score"] = max(0, 100 - health_deductions)
        self.state["alerts"] = alerts

    def predict_failure_days(self) -> Optional[int]:
        """Simplified degradation model — real systems use LSTM/regression"""
        if self.state["vibration_g"] > self.VIBRATION_WARNING_G:
            # Exponential degradation model
            days = int(14 * (self.VIBRATION_CRITICAL_G / self.state["vibration_g"]) ** 2)
            return max(1, days)
        if self.state["temperature_c"] > self.TEMPERATURE_WARNING_C:
            days = int(30 * (self.TEMPERATURE_CRITICAL_C / self.state["temperature_c"]) ** 3)
            return max(1, days)
        return None  # No failure predicted

    def get_status_report(self) -> dict:
        """Generate operator-ready status report"""
        failure_days = self.predict_failure_days()
        return {
            "asset": f"{self.asset_name} ({self.asset_id})",
            "health_score": self.state["health_score"],
            "status": "CRITICAL" if self.state["health_score"] < 50 else
                      "WARNING" if self.state["health_score"] < 80 else "HEALTHY",
            "predicted_failure_days": failure_days,
            "maintenance_urgency": "IMMEDIATE" if failure_days and failure_days <= 7 else
                                   "SOON" if failure_days and failure_days <= 30 else "ROUTINE",
            "alerts": self.state["alerts"],
            "last_updated": self.state["last_updated"],
        }

# Simulate real-time sensor updates
twin = DigitalTwin("PUMP-PROD-001", "Main Circulation Pump")

# Normal operation
twin.update_from_sensor({
    "temperature_c": 72.3, "pressure_bar": 4.2,
    "vibration_g": 0.12, "rpm": 1480, "power_kw": 22.5
})
print("Normal:", twin.get_status_report()["status"])  # HEALTHY

# Degrading bearing
twin.update_from_sensor({
    "temperature_c": 88.1, "pressure_bar": 4.0,
    "vibration_g": 0.38, "rpm": 1475, "power_kw": 23.8
})
report = twin.get_status_report()
print(f"Degraded: {report['status']} — failure in ~{report['predicted_failure_days']} days")`}
      </CodeBlock>

      <SectionHeader number={6} title="Cloud Platforms for Digital Twins" />
      <CompareTable
        leftLabel="Platform"
        rightLabel="Key Capabilities"
        rows={[
          { label: 'Azure Digital Twins', left: 'Most mature, graph-based model', right: 'DTDL modeling language, live execution environment, Time Series Insights integration, native 3DV visualization' },
          { label: 'AWS IoT TwinMaker', left: 'Scene composer with S3 assets', right: 'Grafana dashboard integration, connector SDK for custom data sources, Unreal Engine plugin for 3D' },
          { label: 'GCP Partner Ecosystem', left: 'No native service — partner integrations', right: 'Siemens Xcelerator, PTC ThingWorx, Bentley iTwin on GCP infrastructure' },
          { label: 'Siemens Xcelerator', left: 'Industrial-grade, vendor-neutral', right: 'Strongest in manufacturing — integrates with PLM, MES, SCADA systems' },
        ]}
      />

      <AlertBox type="tip" title="Cloud platforms for Digital Twins">
        Azure Digital Twins (fully managed, graph-based DTDL modeling) has the most mature offering
        for enterprise deployments. AWS IoT TwinMaker excels for industrial visualization use cases.
        For manufacturing specifically, Siemens Xcelerator integrates deeply with PLM and MES systems.
        Start with Azure Digital Twins if you're in the Microsoft ecosystem — the tooling is most complete.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the difference between a digital twin and a BIM model?',
          answer: 'BIM (Building Information Modeling) is a static, design-phase 3D model of a building — excellent for construction planning, quantity takeoff, and coordination between trades. It represents what the building was designed to be. A digital twin is a living operational model connected to the real building\'s sensors (HVAC, occupancy, energy meters). A BIM can become a digital twin when connected to real-time IoT data — many smart building platforms start with the BIM as the geometric foundation.',
        },
        {
          question: 'How much does it cost to build a digital twin?',
          answer: 'Simple asset twins (single machine or equipment): $50K-$500K for setup including sensors, connectivity, cloud platform, and modeling. Complex factory or city twins: $1M-$100M+. Ongoing cloud costs: Azure Digital Twins starts at $0.001 per message, affordable at IoT scale. The major cost is not the software but the sensor installation, network infrastructure, data integration work, and the domain expertise to build accurate physics-based or ML models.',
        },
        {
          question: 'What technology stack powers most digital twins?',
          answer: 'IoT layer: MQTT protocol for sensor data, Azure IoT Hub or AWS IoT Core for ingestion. Time-series storage: InfluxDB, TimescaleDB, or Azure Data Explorer for high-frequency sensor data. Modeling: Azure Digital Twins with DTDL, or PTC ThingWorx, or custom graph databases (Neo4j). Visualization: Unity or Unreal Engine for 3D real-time views, Grafana for operational dashboards. AI/ML: Azure ML, SageMaker, or Python scikit-learn/PyTorch for anomaly detection and predictive models.',
        },
        {
          question: 'Can digital twins be used for people?',
          answer: 'Yes — medical digital twins model individual patient physiology from EHR data, genomics, wearables, and imaging. BioTwin and similar companies are building organ-level models for drug simulation. Athletes use biometric digital twins for performance optimization. However, this raises significant privacy and ethical questions: who owns the twin, who can access the data, and what decisions can be made based on simulations. Regulatory frameworks for human digital twins in clinical settings are still evolving.',
        },
        {
          question: 'What is the DTDL and why does it matter?',
          answer: 'DTDL (Digital Twins Definition Language) is Microsoft\'s open JSON-based language for describing digital twin models. It defines the properties, telemetry, commands, relationships, and components of a twin in a machine-readable schema. It matters because it enables interoperability: a pump model defined in DTDL can be used across different Azure services (Azure Digital Twins, IoT Hub, Time Series Insights) and exported to other platforms. It\'s similar to how OpenAPI standardizes REST APIs.',
        },
        {
          question: 'How do digital twins use machine learning?',
          answer: 'Digital twins use ML in several layers: anomaly detection (Isolation Forest, LSTM autoencoders) identifies unusual sensor patterns; predictive maintenance models (gradient boosting, LSTM) estimate remaining useful life; physics-informed neural networks combine physical equations with sensor data for more accurate simulation; reinforcement learning optimizes operational parameters in real-time. The twin provides continuous labeled data (sensor readings + maintenance records + failure events) that makes these models increasingly accurate over time.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
