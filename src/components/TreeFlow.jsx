import React, { useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useReactFlow,
  useEdgesState,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import darkNode from "./DarkNode";
import { initialNodes, initialEdges, createHtmlTag } from "./data";
import { stratify, tree } from "d3-hierarchy";

const nodeTypes = {
  dark: darkNode,
};

const g = tree();

const getLayoutedElements = (nodes, edges) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    .getBoundingClientRect();

  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);

  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 1.5, height * 1.5])(root);

  return {
    nodes: layout
      .descendants()
      .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};

const TreeFlow = ({ data }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  let edgeIdCounter = 0;
  let offset = 0;

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [nodes, edges]);

  // Generate the nodes recursively
  const generateNodes = (node) => {
    if (node.children.length === 0) {
      return;
    }

    let parentX = node.x;
    offset = node.children.length / 2;

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const calcX = parentX + Math.floor(child.x - offset);

      const childNode = {
        id: `${child.x}-${child.y}`,
        type: "dark",
        position: { x: calcX * 200, y: child.y * 100 },
        data: {
          label: `${createHtmlTag(child.tagName)}`,
          content: `${child.content}`,
        },
      };
      setNodes((prevNodes) => [...prevNodes, childNode]);

      const edgeId = `e-${edgeIdCounter++}`;
      const edge = {
        id: edgeId,
        source: `${node.x}-${node.y}`,
        target: `${child.x}-${child.y}`,
      };
      setEdges((prevEdges) => [...prevEdges, edge]);

      generateNodes(child);
    }
  };

  useEffect(() => {
    if (data) {
      // Reset the nodes and edges
      setNodes(initialNodes);
      setEdges(initialEdges);

      // Create the root node
      const root = data;
      const rootNode = {
        id: `${root.x}-${root.y}`,
        type: "dark",
        position: { x: root.x, y: root.y },
        data: { label: createHtmlTag(root.tagName) },
        content: `${root.content}`,
      };
      setNodes((prevNodes) => [...prevNodes, rootNode]);

      generateNodes(root);
      fitView();
    }
  }, [data]);

  return (
    <div className="mx-auto" style={{ width: "90vw", height: "80vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeOrigin={[0.5, 0.5]}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Controls
          style={{
            backgroundColor: "",
            color: "green",
            borderRadius: "10px",
          }}
        />
        <Background
          variant="lines"
          gap={12}
          size={2}
          color=""
          style={{
            backgroundColor: "#1d1d1b",
            opacity: 0.3,
            transparency: 0.3,
            boxShadow: "0 0 20px #eee",
            borderRadius: "10px",
          }}
        />
        <Panel position="top-right" className="btn-grad-panel">
          <button onClick={onLayout} className="md:font-semibold md:text-xl text-sm">
            Beautify
          </button>
        </Panel>
        <MiniMap
          nodeStrokeWidth={3}
          position={"bottom-right"}
          zoomable={true}
          pannable={true}
          className="custom-minimap"
          maskColor="rgba(0,0,1,0.5)"
          nodeColor="white"
          nodeStrokeColor="white"
        />
      </ReactFlow>
    </div>
  );
};

export default TreeFlow;
