'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CodeBlock, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function PhysicalAiSystemsCompleteGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Physical AI Systems — Architecture, Design, and Real-World Deployment</h1>
      <p className="lead">
        Building physical AI systems requires integrating perception, cognition, and action
        in tight real-time loops. Unlike software-only AI, physical AI systems interact with
        the physical world — where mistakes have real consequences. This guide covers the
        engineering architecture of physical AI systems: sensor integration, real-time processing
        pipelines, the ROS 2 middleware stack, safety frameworks, and the key differences between
        physical AI and traditional industrial automation.
      </p>

      <StatGrid stats={[
        { value: 'ROS 2', label: 'Robot Operating System — standard middleware for robotics', color: 'blue' },
        { value: 'Perception', label: 'seeing and understanding the physical environment in real time', color: 'green' },
        { value: '<10ms', label: 'control loop latency requirement for real-time robot control', color: 'purple' },
        { value: 'Safety first', label: 'fail-safe design is non-negotiable in physical AI systems', color: 'red' },
      ]} />

      <SectionHeader number={1} title="Physical AI System Architecture Overview" />
      <p>
        Physical AI systems are fundamentally different from web applications or data science models.
        They operate under hard real-time constraints, must handle sensor failures gracefully, and
        interact with a physical world that cannot be "undone." The architecture reflects these constraints.
      </p>
      <QuickFact color="blue" label="The four-layer architecture">
        A physical AI system has four interconnected layers: Perception (sensor data → world
        model), Planning (world model → decisions), Control (decisions → actuator commands),
        and Safety (continuous monitoring + override capability). Each layer must meet strict
        real-time requirements while failing safely when inputs are uncertain or hardware malfunctions.
      </QuickFact>

      <SectionHeader number={2} title="Core System Components" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Perception layer', description: 'Sensor drivers, data preprocessing, object detection/classification, SLAM (simultaneous localization and mapping), world model fusion and update. Must run at sensor frame rate (30–100Hz for cameras, 10–20Hz for LiDAR). Low latency is critical — stale perception data causes planning errors.' },
        { title: 'Planning layer', description: 'Task planning (what to do), path planning (how to move through space), and motion planning (specific joint trajectories). Translates high-level goals ("pick object from shelf") into sequences of lower-level actions. Can tolerate slightly higher latency (100–500ms) than the perception and control layers.' },
        { title: 'Control layer', description: 'PID controllers, model predictive control (MPC), joint torque/position controllers, motor drivers. Must run at actuator update rate — 1kHz for precise robotic arms, 100Hz for mobile robots. A real-time OS or dedicated hardware controller is often required at this layer.' },
        { title: 'Safety monitoring', description: 'An independent safety monitor watches all system layers simultaneously. Triggers emergency stop if: unexpected obstacles detected, joint limits approached, commands fall outside safe operating envelope, or communication between layers times out. Must be hardware-independent from the main AI system.' },
      ]} />

      <SectionHeader number={3} title="ROS 2 — The Standard Physical AI Middleware" />
      <p>
        ROS 2 (Robot Operating System 2) is the de facto standard middleware for physical AI systems,
        used in industrial robots, autonomous vehicles, medical devices, and research platforms.
        It provides publish/subscribe messaging, hardware abstraction, and a rich ecosystem of
        pre-built packages for common robotic tasks.
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'What ROS 2 provides', description: 'Publish/subscribe messaging between nodes (processes), service calls for request-response patterns, parameter server for configuration, TF2 for coordinate frame transforms, standardized sensor message formats, visualization with RViz2, and rosbag for data recording and replay.' },
        { title: 'Key ROS 2 packages', description: 'Nav2 (autonomous mobile robot navigation), MoveIt 2 (robotic arm motion planning), sensor_msgs (standard sensor interfaces for camera, LiDAR, IMU), ros2_control (hardware abstraction for controllers), Behavior Tree.CPP (robot behavior trees), OpenCV bridge for vision.' },
        { title: 'DDS real-time communication', description: 'ROS 2 uses DDS (Data Distribution Service) for communication. Fast DDS and CycloneDDS are common implementations. Enables deterministic message delivery with configurable QoS (quality of service) policies — critical for real-time systems where late messages are worse than no message.' },
        { title: 'Real-time OS integration', description: 'For safety-critical control, ROS 2 nodes run on RT Linux (PREEMPT_RT patch), QNX, or VxWorks for hardware-level timing guarantees. The planning and AI layers can run on standard Linux; the low-level control nodes need real-time OS scheduling for <1ms jitter.' },
      ]} />

      <SectionHeader number={4} title="Example: Basic Perception Node in ROS 2" />
      <CodeBlock lang="python" title="ROS 2 perception node (Python)">
{`import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, PointCloud2
from vision_msgs.msg import Detection3DArray
import numpy as np

class PerceptionNode(Node):
    """Fuses camera and LiDAR data into 3D object detections."""

    def __init__(self):
        super().__init__('perception_node')

        # Subscribe to camera and LiDAR topics
        self.camera_sub = self.create_subscription(
            Image, '/camera/color/image_raw',
            self.camera_callback, 10)  # queue depth = 10

        self.lidar_sub = self.create_subscription(
            PointCloud2, '/lidar/points',
            self.lidar_callback, 10)

        # Publish fused 3D detections
        self.detection_pub = self.create_publisher(
            Detection3DArray, '/perception/detections', 10)

        # Load object detection model
        self.detector = self.load_model('yolov8_object_detection.onnx')
        self.get_logger().info('Perception node initialized')

    def camera_callback(self, msg):
        """Process camera frames at 30Hz."""
        # Convert ROS image to numpy array
        image = self.ros_image_to_numpy(msg)

        # Run object detection
        detections_2d = self.detector.infer(image)

        # Store with timestamp for fusion with LiDAR
        self.latest_camera_detections = (msg.header.stamp, detections_2d)

    def lidar_callback(self, msg):
        """Process LiDAR point cloud at 10Hz and fuse with camera."""
        points = self.pointcloud2_to_numpy(msg)

        if hasattr(self, 'latest_camera_detections'):
            # Project detections from 2D image space to 3D world space
            detections_3d = self.fuse_camera_lidar(
                self.latest_camera_detections[1], points)

            # Publish fused 3D detections
            detection_msg = self.create_detection_msg(detections_3d, msg.header)
            self.detection_pub.publish(detection_msg)

def main(args=None):
    rclpy.init(args=args)
    node = PerceptionNode()
    rclpy.spin(node)   # keep node running, processing callbacks
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`}
      </CodeBlock>

      <SectionHeader number={5} title="Safety Design Principles" />
      <p>
        Safety in physical AI is not optional or a late-stage concern — it must be designed in
        from the beginning. A bug in a web app shows a wrong UI. A bug in a physical AI system
        can injure people or destroy expensive equipment.
      </p>
      <KeyPointsGrid columns={2} items={[
        { title: 'Fail-safe defaults', description: 'System stops when uncertain, not continues. Emergency stop is a hardware circuit independent of software — cannot be blocked by a software bug. Power-on state is motors disabled. Any communication timeout → immediate controlled stop.' },
        { title: 'Redundancy for critical components', description: 'Duplicate critical sensors (two cameras for emergency stop zone, not one). Independent safety monitor runs on separate hardware from the AI system. For highest safety levels: two independent computers with majority voting for safety-critical decisions.' },
        { title: 'Operational Design Domain (ODD)', description: 'Define precisely where and when the system can operate safely: speed limits, environmental conditions, workspace boundaries, object types it can handle. Build hard limits that the system cannot be commanded to violate. Clear safe-state transition when approaching ODD boundaries.' },
        { title: 'Validation and certification', description: 'Simulation testing for millions of edge cases before hardware testing. Hardware-in-the-loop (HIL) testing. Fault injection testing — disconnect sensors mid-operation and verify safe response. For regulated industries: IEC 61508 (industrial), ISO 26262 (automotive), ISO 10218 (collaborative robots).' },
      ]} />

      <SectionHeader number={6} title="Deployment Checklist for Physical AI Systems" />
      <VerticalSteps steps={[
        { title: 'Define the operational domain', desc: 'Document exactly what conditions the system can handle: speed limits, object types, lighting conditions, workspace boundaries. The system must refuse to operate outside this domain.' },
        { title: 'Run safety hazard analysis', desc: 'Identify every failure mode and its consequences. Use FMEA (Failure Mode and Effects Analysis). For each hazard: what is the probability, what is the severity, what is the mitigation?' },
        { title: 'Implement independent safety monitor', desc: 'Build a watchdog system on separate hardware that monitors all system layers. Can trigger emergency stop regardless of what the main AI is doing. Test it by killing the main AI process and verifying the stop response.' },
        { title: 'Test edge cases and failure modes', desc: 'Deliberately test: sensor disconnection, corrupted data, power interruptions, communication timeouts, objects outside training distribution. Verify graceful degradation and safe stops in all cases.' },
        { title: 'Run controlled pilot deployment', desc: 'Deploy to one location with extensive human monitoring before scaling. Log everything. Have an easy remote emergency stop. Collect real-world data to improve the system.' },
        { title: 'Establish OTA update process', desc: 'Never update software on physical AI systems without validation. A/B test new versions on a subset of systems. Always maintain rollback capability. Safety-critical updates require extensive testing before deployment.' },
      ]} />

      <AlertBox type="warning" title="Physical AI safety is non-negotiable">
        Software bugs in a web app show a wrong UI. Software bugs in a physical AI system can
        injure people. ISO 26262 (automotive), IEC 61508 (industrial), and ISO 10218 (robots)
        define safety integrity levels (SIL/ASIL). Production physical AI systems require formal
        safety analysis and certification before deployment in any environment with humans present.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What programming languages are used in physical AI systems?',
          answer: 'C++ for real-time control and performance-critical perception — gives deterministic timing and direct memory control. Python for high-level planning, AI inference (via PyTorch/TensorFlow), and rapid prototyping. ROS 2 supports both C++ and Python natively. Rust is gaining traction for safety-critical embedded components — provides memory safety without garbage collection pauses. CUDA for GPU-accelerated computer vision on NVIDIA hardware. Most production systems use C++ for control and Python for higher-level intelligence.',
        },
        {
          question: 'How do physical AI systems handle sensor failures?',
          answer: 'Multiple layers of handling: hardware redundancy (backup sensors for critical functions), software fault detection (sanity checks on data: is LiDAR still returning points? Is camera frame rate dropping?), graceful degradation (switch to reduced capability if secondary sensor fails), and safe state transition (full stop if primary sensor or AI system fails). The key principle: always fail toward safety. Never continue operating with degraded perception if the degradation could cause harm.',
        },
        {
          question: 'What is the difference between physical AI and traditional industrial automation?',
          answer: 'Traditional automation: fixed programs, pre-programmed paths, works only in highly structured environments with precisely placed parts. Requires reprogramming for every change. Physical AI: learns from sensor data, adapts to variation and unstructured environments, can handle objects in arbitrary positions and orientations. A traditional robot arm crashes if a part is 1cm out of place. A physical AI arm with vision finds and picks the part regardless of exact placement — dramatically reducing setup time and enabling flexible manufacturing.',
        },
        {
          question: 'How do I get started with robotics and physical AI development?',
          answer: 'Start with ROS 2 on Ubuntu 22.04 (LTS). Install the Desktop-Full version which includes RViz2, navigation tools, and examples. Follow the official ROS 2 tutorials to understand nodes, topics, and services. Get a low-cost robot platform: TurtleBot4 (mobile robot, ~$1000) or a 6-DOF robot arm simulation in Gazebo (free). The Edge Impulse platform is excellent for getting started with embedded ML on physical hardware without writing everything from scratch.',
        },
        {
          question: 'What is SLAM and why is it important for physical AI?',
          answer: 'SLAM (Simultaneous Localization and Mapping) is the ability to build a map of an unknown environment while simultaneously tracking position within that map. It is fundamental to any robot that needs to navigate without pre-existing maps. Approaches: LiDAR SLAM (Cartographer, LOAM) for precise 3D mapping; Visual SLAM (ORB-SLAM3, RTAB-Map) using cameras. Modern approaches combine both for robustness. Without SLAM, robots need expensive pre-mapped environments or GPS (unavailable indoors).',
        },
        {
          question: 'How are physical AI systems tested before deployment?',
          answer: 'Testing hierarchy: 1) Unit tests for individual components (perception algorithms, path planning). 2) Integration tests with simulated sensors (Gazebo, Isaac Sim, Webots). 3) Hardware-in-the-loop (HIL) testing with real controllers but simulated environments. 4) Real hardware testing in controlled lab environments. 5) Pilot deployments with extensive human monitoring. 6) Progressive rollout with telemetry and remote override capability. Safety-critical systems additionally require formal verification and certification against standards like IEC 61508.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
