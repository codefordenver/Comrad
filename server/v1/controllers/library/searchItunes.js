/**
 * @swagger
 *
 * /library/search-itunes:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: SearchItunes
 *     summary: Search Itunes
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: q
 *       required: true
 *       in: query
 *       type: string
 *       description: The string to search for
 *     description: |
 *       Search for albums in itunes to import to the library.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const keys = require('../../config/keys');

async function search(req, res) {
  let { q } = req.query;

  if (!q) {
    return res.json([]);
  }


  // replicate this:

  'http://itunes.apple.com/search?term=' . $term . '&entity=album&limit=60'
    if (isset($this->params->query['q']) && $this->params->query['q'] !== '') {
      $response = $this->ITunes->searchAlbums($this->params->query['q']);
      
      $iTunesIds = array();
      foreach ($response['results'] as $album) {
        $iTunesIds[$album['collectionId']] = array(
          'trackCount' => $album['trackCount']
        );
      }
      
      $localAlbums = $this->Album->find('all', array(
        'conditions' => array('Album.a_ITunesId' => array_keys($iTunesIds))
      ));
      
      foreach ($response['results'] as $key => $iTunesAlbum) {
        // Try to find the local album
        foreach ($localAlbums as $localAlbum) {
          if ($localAlbum['Album']['a_ITunesId'] == $iTunesAlbum['collectionId']) {
            $response['results'][$key]['localId'] = $localAlbum['Album']['a_AlbumID'];
            $response['results'][$key]['localTrackCount'] = count($localAlbum['Track']);
            
            // The iTunes 'trackCount' field counts an extra "track" for each disc, so we need to add
            // the local disc count to the local track count when comparing to figure out if the album
            // has been entirely imported.
            $numDiscs = 1;
            foreach ($localAlbum['Track'] as $localTrack) {
              if ($localTrack['t_DiskNumber'] > $numDiscs) $numDiscs = $localTrack['t_DiskNumber'];
            }
            
            $response['results'][$key]['isPartialImport'] = $iTunesAlbum['trackCount'] > count($localAlbum['Track']) + $numDiscs;
            break;
          }
        }
      }
      
      $this->set('response', $response);

  return res.json({
    docs: data,
    totalPages: 1,
  });
}

module.exports = search;
