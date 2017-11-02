/*================================
=            Progress            =
================================*/
import emerge_roots from './progresses/emerge_roots.js';
import gather_nutrients from './progresses/gather_nutrients.js';
import grow_cells from './progresses/grow_cells.js';
import gain_energy from './progresses/gain_energy.js';
import create_worker from './progresses/create_worker.js';

const progress = {
    emerge_roots,
    gather_nutrients,
    grow_cells,
    gain_energy,
    create_worker,
};

export default progress;
