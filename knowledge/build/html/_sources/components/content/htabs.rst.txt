.. index:: Horizontal Tabs

.. _htabs:

Horizontal Tabs
===============

Este componente manusea áreas horizontais independentes. 

.. image:: ../resources/htabs.png

Requisitos
----------
       
=================================== ===============
``/framework/components/htabs.js``                       
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-htabs>
        <div slot="tab" id="?">
           <i class="fas fa-th" style="margin-right: 5px"></i>
           <fwk-label value="???"></fwk-label>
           <fwk-text class="counter" color="blue" value="(0)"></fwk-label>
        <div>
        <div slot="content" id="?">
            component
            component
            ...
        <div>
        ...
    </fwk-htabs>

==================== ======================================= =========== =============== =======
Atributo             Descrição                               Obrigatório Opções          Default
==================== ======================================= =========== =============== =======
``id``               Identificador único do componente       Sim (?)    
``value``            Indentificador da tab seleccionada      Não                
``border``           Com border                              Não         "true", "false" "false" 
``align``            Alinhamento das tabs                    Não         "left", "right" "left"
``template_height``  | Acompanha o footer da página          Não         "1", "2", ...   "175"                                                  
                     | Define a altura ocupada pelo template                         
``hide``             Esconde componente                      Não         "true", "false" "false"       
``min-width``        Largura mínima do componente            Não         "1", "2", ...   "320"
``min-height``       Altura mínima do componente             Não         "1", "2", ...   "160"
``max-height``       Altura máxima do componente             Não         "1", "2", ...   content
``color``            Cor base do componente                  Não         "blue", "gray"  "gray"
==================== ======================================= =========== =============== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

=========== =============== =========== =====================
Slot         Descrição      Obrigatório Observações
=========== =============== =========== =====================
``tab``     Etiqueta da tab Sim         :ref:`htabs_tab_slot`
``content`` Componentes     Sim         Admite html
=========== =============== =========== =====================

.. attention:: A ordem das slots no componente é, obrigatóriamente, a seguinte:

    #. ``tab``
    #. ``content`` 
    #. ``tab``
    #. ``content``

----

.. _htabs_tab_slot:

Slot tab
--------

| A slot ``tab`` é um container de para um conjunto de elementos, qualquer um deles opcional.
| Por princípio terá a seguinte composição:

* Um icone: '<i>' ou :ref:`image`
*  Um texto: :ref:`label`
*  Um contador: :ref:``text`` (identificado pela classe **counter**)

=========== ========================== =========== =============== =======
Atributo    Descrição                  Obrigatório Opções          Default
=========== ========================== =========== =============== =======
``id``      Identificador único da tab  Não   
``hide``    Esconde tab                 Não        "true", "false" "false"          
=========== ========================== =========== =============== =======

.. important:: 

    O atributo ``id`` tem de ser igual ao ``id`` da slot ``content`` que lhe correponde e só é obrigatório no caso de ser necessária a identificação da tab para interacção com qualquer uma das suas funcionalidades.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_htabs = FormHelper.getComponent('fwk_htabs');

Seleccionar / desseleccionar
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_htabs.value = '?'; (se estiver seleccionada, desselecciona-a)
    obj_htabs.value = '';

Ler valor (tab seleccionada)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let value = obj_htabs.value;

Atribuir valor ao contador
^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

   obj_htabs.counter('?key', '?value');

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_htabs.hide = false;
    obj_htabs.hide = true;

Mostrar / esconder tab
^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_htabs.showTab('?');
    obj_htabs.hideTab('?');

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_htabs.hide;
    let is_tab_hide = obj_htabs.isTabHide('?');

----

Referências
-----------

| :ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.