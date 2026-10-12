$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$outDir = "C:\Users\Kalpit\Desktop\AlgoX\assets\screenshots"

$items = @(
  @{ file = "sorting_bubble.png"; url = "http://localhost:5173/visualizer/sorting?algo=bubble" },
  @{ file = "sorting_quick.png"; url = "http://localhost:5173/visualizer/sorting?algo=quick" },
  @{ file = "sorting_merge.png"; url = "http://localhost:5173/visualizer/sorting?algo=merge" },
  @{ file = "sorting_heap.png"; url = "http://localhost:5173/visualizer/sorting?algo=heap" },
  @{ file = "searching_binary.png"; url = "http://localhost:5173/visualizer/searching?algo=binary" },
  @{ file = "searching_linear.png"; url = "http://localhost:5173/visualizer/searching?algo=linear" },
  @{ file = "ds_bst.png"; url = "http://localhost:5173/visualizer/data-structures?ds=bst" },
  @{ file = "ds_stack.png"; url = "http://localhost:5173/visualizer/data-structures?ds=stack" },
  @{ file = "ds_queue.png"; url = "http://localhost:5173/visualizer/data-structures?ds=queue" },
  @{ file = "ds_linked_list.png"; url = "http://localhost:5173/visualizer/data-structures?ds=linked-list" },
  @{ file = "graph_bfs.png"; url = "http://localhost:5173/visualizer/graph?algo=bfs" },
  @{ file = "graph_dfs.png"; url = "http://localhost:5173/visualizer/graph?algo=dfs" },
  @{ file = "catalogue_reference.png"; url = "http://localhost:5173/algorithms" }
)

foreach ($item in $items) {
  $target = Join-Path $outDir $item.file
  $url = $item.url
  Write-Host "Capturing $($item.file)..."
  Start-Process -FilePath $edgePath -ArgumentList "--headless", "--screenshot=$target", "--window-size=1280,820", "--virtual-time-budget=2500", $url -Wait
}

Write-Host "All screenshots captured successfully!"
