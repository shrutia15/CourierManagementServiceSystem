package com.courier.pojos;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Component
public class Graph {
    private Map<String, Map<String, Integer>> graph;
    
    private Map<String,Long> warehouseNameToId = Map.of(
             "Delhi",3L,
             "Pune",5L, 
             "Hyderabad",4L, 
             "Chennai", 2L,
             "Mumbai",1L
        );

    public Graph() {
        this.graph = new HashMap<>();
        initializeGraph();
    }

    private void initializeGraph() {
        graph.put("Delhi", new HashMap<>(Map.of(
            "Mumbai", 1400,
            "Pune", 1500,
            "Hyderabad", 1550,
            "Chennai", 2200
        )));
        
        graph.put("Mumbai", new HashMap<>(Map.of(
            "Delhi", 1400,
            "Pune", 150,
            "Hyderabad", 710,
            "Chennai", 1330
        )));
        
        graph.put("Pune", new HashMap<>(Map.of(
            "Delhi", 1500,
            "Mumbai", 150,
            "Hyderabad", 560,
            "Chennai", 1200
        )));
        
        graph.put("Hyderabad", new HashMap<>(Map.of(
            "Delhi", 1550,
            "Mumbai", 710,
            "Pune", 560,
            "Chennai", 630
        )));
        
        graph.put("Chennai", new HashMap<>(Map.of(
            "Delhi", 2200,
            "Mumbai", 1330,
            "Pune", 1200,
            "Hyderabad", 630
        )));
    }

    
    public Map<String, Map<String, Integer>> getGraph() {
        return graph;
    }
    
    static class Node implements Comparable<Node> {
        String vertex;
        int distance;
        Node(String vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }
    
    public Map<String, Object> dijkstra(String start, String end) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previous = new HashMap<>();
        
        for (String node : graph.keySet()) {
            distances.put(node, Integer.MAX_VALUE);
            previous.put(node, null);
        }
        distances.put(start, 0);
        pq.add(new Node(start, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            
            if (current.vertex.equals(end)) break;
            
            if (current.distance > distances.get(current.vertex)) {
                continue;
            }
            
            for (Map.Entry<String, Integer> neighbor : graph.get(current.vertex).entrySet()) {
                int newDist = current.distance + neighbor.getValue();
                if (newDist < distances.get(neighbor.getKey())) {
                    distances.put(neighbor.getKey(), newDist);
                    previous.put(neighbor.getKey(), current.vertex);
                    pq.add(new Node(neighbor.getKey(), newDist));
                }
            }
        }
        
        List<String> path = reconstructPath(previous, start, end);
        Map<String, Object> result = new HashMap<>();
        result.put("distance", distances.get(end));
        result.put("path", path);
        return result;
    }
    
    private List<String> reconstructPath(Map<String, String> previous, String start, String end) {
        List<String> path = new ArrayList<>();
        for (String at = end; at != null; at = previous.get(at)) {
            path.add(at);
        }
        Collections.reverse(path);
        return path.get(0).equals(start) ? path : Collections.emptyList();
    }
    
}

