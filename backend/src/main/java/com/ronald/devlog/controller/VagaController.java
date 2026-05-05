package com.ronald.devlog.controller;

import com.ronald.devlog.model.Vaga;
import com.ronald.devlog.service.VagaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vagas")
public class VagaController {

    private final VagaService service;

    public VagaController(VagaService vagaService) {
        this.service = vagaService;
    }

    @PostMapping
    public Vaga adicionarVaga(@RequestBody Vaga novaVaga){
        return service.adicionarVaga(novaVaga);
    }

    @GetMapping
    public List<Vaga> listarTodas(){
        return service.listarTodas();
    }

    @PutMapping("/{id}")
    public Vaga atualizarVaga(@PathVariable Long id, @RequestBody Vaga vagaAtualizada){
        return service.atualizarVaga(id,  vagaAtualizada);
    }

    @DeleteMapping("/{id}")
    public void deletarVaga(@PathVariable Long id){
        service.deletarVaga(id);
    }
}
