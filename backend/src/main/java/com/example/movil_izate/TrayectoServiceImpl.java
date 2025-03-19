package com.example.movil_izate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;

@Service
public class TrayectoServiceImpl implements TrayectoService {

    @Autowired
    private TrayectoRepository trayectoRepository;

    @Override
    public Trayecto iniciarTrayecto(String vehiculoId) {
        Trayecto trayecto = new Trayecto();
        trayecto.setVehiculoId(vehiculoId);
        trayecto.setInicioTrayecto(Timestamp.from(Instant.now()));
        return trayectoRepository.save(trayecto);
    }

    @Override
    public Trayecto registrarUbicacion(Long trayectoId, double latitud, double longitud) {
        Trayecto trayecto = trayectoRepository.findById(trayectoId).orElse(null);
        if (trayecto != null) {
            trayecto.setLatitud(latitud);
            trayecto.setLongitud(longitud);
            trayecto.setHora(new Time(System.currentTimeMillis()));
            trayecto.setFecha(new Date(System.currentTimeMillis()));
            return trayectoRepository.save(trayecto);
        }
        return null;
    }

    @Override
    public Trayecto finalizarTrayecto(Long trayectoId) {
        Trayecto trayecto = trayectoRepository.findById(trayectoId).orElse(null);
        if (trayecto != null) {
            trayecto.setFinTrayecto(Timestamp.from(Instant.now()));
            return trayectoRepository.save(trayecto);
        }
        return null;
    }
}