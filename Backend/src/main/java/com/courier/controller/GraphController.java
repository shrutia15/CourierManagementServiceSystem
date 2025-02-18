package com.courier.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courier.pojos.Graph;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class GraphController {
	@Autowired
	private Graph graph;
	
	@GetMapping("/price/{source}/{destination}")
	public Object distance(@PathVariable String source, @PathVariable String destination) {
		return graph.dijkstra(source, destination).get("distance");
	}
	
}
