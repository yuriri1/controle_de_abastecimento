# Estrutura do banco de dados

## Tabelas:

| Schema | Name          |
| ------ | ------------- |
| public | abastecimento |
| public | combustivel   |
| public | modelo        |
| public | veiculo       |

---

### Combustivel

| Column | Type                  | Nullable |
| ------ | --------------------- | -------- |
| id     | integer               | not null |
| tipo   | character varying(20) |          |

---

### Modelo

| Column      | Type                   | Nullable |
| ----------- | ---------------------- | -------- |
| id          | integer                | not null |
| descricao   | character varying(255) |          |
| capactanque | integer                |          |

---

### Veiculo

| Column    | Type                   | Nullable |
| --------- | ---------------------- | -------- |
| placa     | character varying(7)   | not null |
| id_modelo | interger               |          |
| obs       | character varying(255) |          |

---

### Abastecimento

| Column          | Type                 | Nullable |
| --------------- | -------------------- | -------- |
| id              | interger             | not null |
| placa           | character varying(7) |          |
| tipocombustivel | integer              |          |
| abasttotal      | boolean              |          |
| quantidade      | numeric(6,2)         |          |
| valortotal      | money                |          |
| data            | timestamp            |          |
