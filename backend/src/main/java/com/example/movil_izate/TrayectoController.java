package com.example.movil_izate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trayectos")
@CrossOrigin(origins = "*")
public class TrayectoController {

    @Autowired
    private TrayectoService trayectoService;

    @PostMapping("/iniciar/{vehiculoId}")
    public ResponseEntity<Trayecto> iniciarTrayecto(@PathVariable("vehiculoId") String vehiculoId) {
        Trayecto trayecto = trayectoService.iniciarTrayecto(vehiculoId);
        return new ResponseEntity<>(trayecto, HttpStatus.OK);
    }

    @PostMapping("/ubicacion/{trayectoId}")
    public ResponseEntity<Trayecto> registrarUbicacion(
            @PathVariable("trayectoId") Long trayectoId,
            @RequestBody TrayectoUbicacionRequest request) { // Recibe un objeto TrayectoUbicacionRequest en el cuerpo de la petición
        Trayecto trayecto = trayectoService.registrarUbicacion(trayectoId, request.getLatitud(), request.getLongitud());
        return new ResponseEntity<>(trayecto, HttpStatus.OK);
    }

    @PostMapping("/finalizar/{trayectoId}")
    public ResponseEntity<Trayecto> finalizarTrayecto(@PathVariable("trayectoId") Long trayectoId) {
        Trayecto trayecto = trayectoService.finalizarTrayecto(trayectoId);
        return new ResponseEntity<>(trayecto, HttpStatus.OK);
    }
}