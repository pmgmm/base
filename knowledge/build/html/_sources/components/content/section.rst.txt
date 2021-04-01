.. index:: Section

.. _section:

Section
=======

Este componente associa componentes dentro de uma área isolada.

.. image:: ../resources/section.png

Requisitos
----------
         
==================================== ===============
``/framework/components/section.js`` 
``/framework/components/shared.js``  :ref:`jsshared`     
==================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-section>
        <i slot="icon" class="fas fa-user-cog"></i>
        <div slot="content">
            component
            component
            ...
        </div>
    </fwk-section>

============== ================================= =========== =============== =======
Atributo       Descrição                         Obrigatório Opções          Default
============== ================================= =========== =============== =======
``id``         Identificador único do componente Sim (?)        
``value``      Texto do botão                    Não         
``open``       Estado inicial aberto             Não         "true", "false" "false" 
``hide``       Esconde componente                Não         "true", "false" "false" 
``color``      Cor base do componente            Não         "blue", "gray"  "gray" 
``min-height`` Altura mínima do corpo            Não                         content
``max-height`` Altura máxima do corpo            Não                         content
``align``      Alinhamento do botão              Não         "left", "right" "left"
============== ================================= =========== =============== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

=========== ============== =========== ===========
Slot        Descrição      Obrigatório Observações
=========== ============== =========== ===========
``icon``    Icone de botão Não
``content`` Componentes    Sim         Admite html
=========== ============== =========== ===========

.. important:: O atributo ``value`` e a slot ``icon`` podem coexistir juntos no componente. Um deles deve obrigatóriamente ser utilizado.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_section = FormHelper.getComponent('fwk_section');

Valor (texto do botão)
^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_section.value = '???';

Abrir / fechar
^^^^^^^^^^^^^^
.. code:: Javascript

    obj_section.open = true;
    obj_section.open = false;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_section.hide = false;
    obj_section.hide = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_section.hide;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.